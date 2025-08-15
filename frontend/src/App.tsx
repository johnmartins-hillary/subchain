import React, { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { AboutSection } from "./components/AboutSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { SignUpPage } from "./components/auth/SignUpPage";
import { VerifyEmailPage } from "./components/auth/VerifyEmailPage";
import { SignInPage } from "./components/auth/SignInPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { MyFundingPage } from "./components/dashboard/MyFundingPage";
import { CommunitiesPage } from "./components/dashboard/CommunitiesPage";
import { SettingsPage } from "./components/dashboard/SettingsPage";
import { Toaster } from "./components/ui/sonner";
import { ProfilePage } from "./components/dashboard/ProfilePage";
import { VoteCommunityPage } from "./components/dashboard/VoteCommunityPage";
import { CreateCommunityPage } from "./components/dashboard/CreateCommunity";
import Configurations from "./components/dashboard/Config";

type PageState = "landing" | "signup" | "verify-email" | "signin" | "dashboard";
type DashboardPage =
  | "profile"
  | "communities"
  | "fund-community"
  | "settings"
  | "create-communities"
  | "configurations";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");
  const [currentDashboardPage, setCurrentDashboardPage] =
    useState<DashboardPage>("profile");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Smooth scrolling for anchor links (only on landing page)
    if (currentPage === "landing") {
      const anchors =
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

      const handleClick = (e: MouseEvent, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };

      anchors.forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (href) {
          anchor.addEventListener("click", (e) => handleClick(e, href));
        }
      });

      // Optional cleanup to avoid multiple bindings
      return () => {
        anchors.forEach((anchor) => {
          const href = anchor.getAttribute("href");
          if (href) {
            anchor.removeEventListener("click", (e) => handleClick(e, href));
          }
        });
      };
    }
  }, [currentPage]);

  // Authentication handlers
  const handleSignUp = () => setCurrentPage("signup");
  const handleSignIn = () => setCurrentPage("signin");
  const handleVerifyEmail = () => setCurrentPage("verify-email");
  const handleBackToLanding = () => setCurrentPage("landing");
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
    setCurrentDashboardPage("profile");
  };

  // Dashboard navigation
  const handleDashboardNavigate = (page: string) => {
    setCurrentDashboardPage(page as DashboardPage);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPage("landing");
  };

  const handleGoToDashboard = () => {
    if (isAuthenticated) {
      setCurrentPage("dashboard");
    }
  };

  // Render authentication pages
  if (currentPage === "signup") {
    return (
      <>
        <SignUpPage
          onVerifyEmail={handleVerifyEmail}
          onSignIn={handleSignIn}
          onBack={handleBackToLanding}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "verify-email") {
    return (
      <>
        <VerifyEmailPage
          onSignIn={handleSignIn}
          onBack={() => setCurrentPage("signup")}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "signin") {
    return (
      <>
        <SignInPage
          onSignUp={handleSignUp}
          onSuccess={handleAuthSuccess}
          onBack={handleBackToLanding}
        />
        <Toaster />
      </>
    );
  }

  // Render dashboard
  if (currentPage === "dashboard" && isAuthenticated) {
    const renderDashboardContent = () => {
      switch (currentDashboardPage) {
        case "profile":
          return <ProfilePage />;
        case "create-communities":
          return <CreateCommunityPage />;
        case "communities":
          return <VoteCommunityPage />;
        case "fund-community":
          return <CommunitiesPage />;
        case "settings":
          return <SettingsPage />;
        case "configurations":
          return <Configurations />;
        default:
          return <MyFundingPage />;
      }
    };

    return (
      <>
        <DashboardLayout
          currentPage={currentDashboardPage}
          onNavigate={handleDashboardNavigate}
          onSignOut={handleSignOut}
        >
          {renderDashboardContent()}
        </DashboardLayout>
        <Toaster />
      </>
    );
  }

  // Landing page with auth integration
  return (
    <>
      <div className="min-h-screen">
        <Navigation
          onSignUp={handleSignUp}
          onSignIn={handleSignIn}
          isAuthenticated={isAuthenticated}
          onSignOut={handleSignOut}
          onDashboard={handleGoToDashboard}
        />
        <main>
          <HeroSection onGetStarted={handleSignUp} />
          <HowItWorksSection />
          <AboutSection />
          <TestimonialsSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}
