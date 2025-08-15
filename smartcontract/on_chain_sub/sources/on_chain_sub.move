module subscription::manager {
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::clock::{Self, Clock};
    use sui::event;
    use std::string::{Self, String};
    use std::vector;
    use sui::table::{Self, Table};

    // ============ Error Constants ============
    const ENotPlanCreator: u64 = 1;
    const EInsufficientPayment: u64 = 2;
    const ESubscriptionNotFound: u64 = 3;
    const ESubscriptionExpired: u64 = 4;
    const EMaxSubscribersReached: u64 = 5;
    const EPlanNotActive: u64 = 6;
    const ENotSubscriber: u64 = 7;
    const EAlreadySubscribed: u64 = 8;
    const ENoEarningsToWithdraw: u64 = 9;

    // ============ Structs ============
    
    /// Represents a subscription plan created by a service provider
    public struct SubscriptionPlan has key, store {
        id: UID,
        creator: address,
        name: String,
        description: String,
        price_per_period: u64, // in SUI MIST (1 SUI = 1_000_000_000 MIST)
        period_duration: u64,  // duration in milliseconds
        max_subscribers: u64,
        current_subscribers: u64,
        active: bool,
        earnings: Balance<SUI>, // accumulated earnings
        created_at: u64,
    }

    /// Represents an individual subscription to a plan
    public struct Subscription has key, store {
        id: UID,
        plan_id: ID,
        subscriber: address,
        start_time: u64,
        last_payment_time: u64,
        next_payment_due: u64,
        periods_paid: u64,
        active: bool,
    }

    /// Main registry to manage all plans and subscriptions
    public struct SubscriptionRegistry has key {
        id: UID,
        plans: Table<ID, bool>, // plan_id -> exists
        user_subscriptions: Table<address, vector<ID>>, // user -> subscription_ids
        total_plans_created: u64,
        total_active_subscriptions: u64,
    }

    /// Admin capability for registry management
    public struct AdminCap has key { id: UID }

    // ============ Events ============
    
    public struct PlanCreated has copy, drop {
        plan_id: ID,
        creator: address,
        name: String,
        price: u64,
        period_duration: u64,
    }

    public struct SubscriptionStarted has copy, drop {
        subscription_id: ID,
        plan_id: ID,
        subscriber: address,
        start_time: u64,
    }

    public struct PaymentProcessed has copy, drop {
        subscription_id: ID,
        subscriber: address,
        amount: u64,
        period: u64,
    }

    public struct SubscriptionCancelled has copy, drop {
        subscription_id: ID,
        subscriber: address,
        plan_id: ID,
    }

    // ============ Init Function ============
    
    fun init(ctx: &mut TxContext) {
        // Create admin capability
        let admin_cap = AdminCap { id: object::new(ctx) };
        transfer::transfer(admin_cap, tx_context::sender(ctx));

        // Create subscription registry
        let registry = SubscriptionRegistry {
            id: object::new(ctx),
            plans: table::new(ctx),
            user_subscriptions: table::new(ctx),
            total_plans_created: 0,
            total_active_subscriptions: 0,
        };
        transfer::share_object(registry);
    }

    // ============ Plan Management Functions ============
    
    /// Create a new subscription plan
    public fun create_plan(
        registry: &mut SubscriptionRegistry,
        name: vector<u8>,
        description: vector<u8>,
        price_per_period: u64,
        period_duration: u64,
        max_subscribers: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ): ID {
        let plan_id = object::new(ctx);
        let plan_id_copy = object::uid_to_inner(&plan_id);
        
        let plan = SubscriptionPlan {
            id: plan_id,
            creator: tx_context::sender(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            price_per_period,
            period_duration,
            max_subscribers,
            current_subscribers: 0,
            active: true,
            earnings: balance::zero(),
            created_at: clock::timestamp_ms(clock),
        };

        // Add to registry
        table::add(&mut registry.plans, plan_id_copy, true);
        registry.total_plans_created = registry.total_plans_created + 1;

        // Emit event
        event::emit(PlanCreated {
            plan_id: plan_id_copy,
            creator: tx_context::sender(ctx),
            name: plan.name,
            price: price_per_period,
            period_duration,
        });

        // Transfer plan to creator
        transfer::public_transfer(plan, tx_context::sender(ctx));
        
        plan_id_copy
    }

    /// Subscribe to a plan
    public fun subscribe_to_plan(
        registry: &mut SubscriptionRegistry,
        plan: &mut SubscriptionPlan,
        payment: Coin<SUI>,
        clock: &Clock,
        ctx: &mut TxContext
    ): ID {
        let subscriber = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);
        
        // Validate plan is active and has space
        assert!(plan.active, EPlanNotActive);
        assert!(plan.current_subscribers < plan.max_subscribers, EMaxSubscribersReached);
        
        // Validate payment amount
        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= plan.price_per_period, EInsufficientPayment);

        // Check if user already has subscription to this plan
        let plan_id = object::uid_to_inner(&plan.id);
        if (table::contains(&registry.user_subscriptions, subscriber)) {
            let user_subs = table::borrow(&registry.user_subscriptions, subscriber);
            // In a full implementation, we'd check if any subscription is for this plan
            // For simplicity, we'll allow multiple subscriptions for now
        };

        // Process payment
        let payment_balance = coin::into_balance(payment);
        balance::join(&mut plan.earnings, payment_balance);

        // Create subscription
        let subscription_id = object::new(ctx);
        let subscription_id_copy = object::uid_to_inner(&subscription_id);
        
        let subscription = Subscription {
            id: subscription_id,
            plan_id,
            subscriber,
            start_time: current_time,
            last_payment_time: current_time,
            next_payment_due: current_time + plan.period_duration,
            periods_paid: 1,
            active: true,
        };

        // Update plan subscriber count
        plan.current_subscribers = plan.current_subscribers + 1;
        
        // Update registry
        registry.total_active_subscriptions = registry.total_active_subscriptions + 1;
        
        // Add to user's subscriptions
        if (!table::contains(&registry.user_subscriptions, subscriber)) {
            table::add(&mut registry.user_subscriptions, subscriber, vector::empty());
        };
        let user_subs = table::borrow_mut(&mut registry.user_subscriptions, subscriber);
        vector::push_back(user_subs, subscription_id_copy);

        // Emit events
        event::emit(SubscriptionStarted {
            subscription_id: subscription_id_copy,
            plan_id,
            subscriber,
            start_time: current_time,
        });

        event::emit(PaymentProcessed {
            subscription_id: subscription_id_copy,
            subscriber,
            amount: payment_amount,
            period: 1,
        });

        // Transfer subscription to subscriber
        transfer::transfer(subscription, subscriber);
        
        subscription_id_copy
    }

    /// Process recurring payment for a subscription
    public fun process_payment(
        subscription: &mut Subscription,
        plan: &mut SubscriptionPlan,
        payment: Coin<SUI>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let current_time = clock::timestamp_ms(clock);
        let subscriber = tx_context::sender(ctx);
        
        // Validate subscription belongs to sender
        assert!(subscription.subscriber == subscriber, ENotSubscriber);
        assert!(subscription.active, ESubscriptionExpired);
        
        // Check if payment is due
        assert!(current_time >= subscription.next_payment_due, ESubscriptionNotFound);
        
        // Validate payment amount
        let payment_amount = coin::value(&payment);
        assert!(payment_amount >= plan.price_per_period, EInsufficientPayment);

        // Process payment
        let payment_balance = coin::into_balance(payment);
        balance::join(&mut plan.earnings, payment_balance);

        // Update subscription
        subscription.last_payment_time = current_time;
        subscription.next_payment_due = current_time + plan.period_duration;
        subscription.periods_paid = subscription.periods_paid + 1;

        // Emit event
        event::emit(PaymentProcessed {
            subscription_id: object::uid_to_inner(&subscription.id),
            subscriber,
            amount: payment_amount,
            period: subscription.periods_paid,
        });
    }

    /// Cancel a subscription
    public fun cancel_subscription(
        registry: &mut SubscriptionRegistry,
        subscription: &mut Subscription,
        plan: &mut SubscriptionPlan,
        ctx: &mut TxContext
    ) {
        let subscriber = tx_context::sender(ctx);
        
        // Validate subscription belongs to sender
        assert!(subscription.subscriber == subscriber, ENotSubscriber);
        assert!(subscription.active, ESubscriptionExpired);

        // Deactivate subscription
        subscription.active = false;
        
        // Update plan subscriber count
        plan.current_subscribers = plan.current_subscribers - 1;
        
        // Update registry
        registry.total_active_subscriptions = registry.total_active_subscriptions - 1;

        // Emit event
        event::emit(SubscriptionCancelled {
            subscription_id: object::uid_to_inner(&subscription.id),
            subscriber,
            plan_id: subscription.plan_id,
        });
    }

    /// Withdraw earnings from a plan (only plan creator can do this)
    public fun withdraw_earnings(
        plan: &mut SubscriptionPlan,
        ctx: &mut TxContext
    ): Coin<SUI> {
        assert!(plan.creator == tx_context::sender(ctx), ENotPlanCreator);
        
        let earnings_amount = balance::value(&plan.earnings);
        assert!(earnings_amount > 0, ENoEarningsToWithdraw);
        
        let earnings = balance::withdraw_all(&mut plan.earnings);
        coin::from_balance(earnings, ctx)
    }

    // ============ View Functions ============
    
    /// Check if a subscription is currently active
    public fun is_subscription_active(subscription: &Subscription, clock: &Clock): bool {
        if (!subscription.active) {
            return false
        };
        
        let current_time = clock::timestamp_ms(clock);
        // Grace period of 24 hours past due date
        let grace_period = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        current_time <= subscription.next_payment_due + grace_period
    }

    /// Get subscription details
    public fun get_subscription_info(subscription: &Subscription): (ID, address, u64, u64, u64, bool) {
        (
            subscription.plan_id,
            subscription.subscriber,
            subscription.start_time,
            subscription.next_payment_due,
            subscription.periods_paid,
            subscription.active
        )
    }

    /// Get plan details
    public fun get_plan_info(plan: &SubscriptionPlan): (address, String, u64, u64, u64, u64, bool, u64) {
        (
            plan.creator,
            plan.name,
            plan.price_per_period,
            plan.period_duration,
            plan.max_subscribers,
            plan.current_subscribers,
            plan.active,
            balance::value(&plan.earnings)
        )
    }

    /// Get registry stats
    public fun get_registry_stats(registry: &SubscriptionRegistry): (u64, u64) {
        (registry.total_plans_created, registry.total_active_subscriptions)
    }

    // ============ Admin Functions ============
    
    /// Emergency pause a plan (admin only)
    public fun admin_pause_plan(_: &AdminCap, plan: &mut SubscriptionPlan) {
        plan.active = false;
    }

    /// Reactivate a paused plan (admin only)
    public fun admin_reactivate_plan(_: &AdminCap, plan: &mut SubscriptionPlan) {
        plan.active = true;
    }
}