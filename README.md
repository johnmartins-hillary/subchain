# SubChain

**SubChain** is the first decentralized subscription management platform built on the Sui blockchain. This frontend provides a seamless interface for service providers to create subscription plans and for users to manage and subscribe to recurring services securely on-chain.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

SubChain enables:

- **Service Providers** to create subscription plans with automatic recurring payments.
- **Subscribers** to manage and pay for subscriptions transparently on-chain.
- **Global reach** without dependency on traditional payment processors.
- **Trustless and low-cost subscription management** leveraging Sui blockchain’s parallel transaction processing.

---

## Features

- Automated recurring payments via smart contracts  
- Transparent earnings dashboard for service providers  
- Global access without geographic restrictions  
- Instant setup of subscription plans  
- Subscribers can cancel anytime  
- Real-time analytics of subscriber activity and revenue  

---

## Tech Stack

- **Frontend:** React, TypeScript  
- **Styling:** Tailwind CSS, ShadCN UI components  
- **Animations:** Framer Motion  
- **Blockchain Integration:** Sui Blockchain, @mysten/sui/client, @mysten/dapp-kit  
- **Notifications:** Sonner toast  
- **State Management:** React Hooks / Context API  
- **Deployment:** Vercel / Netlify / any static hosting  

---

## Getting Started

### Prerequisites

- Node.js >= 18  
- Yarn or npm  
- MetaMask or any Sui-compatible wallet  

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/subchain-frontend.git
cd subchain-frontend

# Install dependencies
yarn install
# or
npm install
