# README (Docs Mirror)
This file mirrors the root README. Do not edit here - edit the root README.md instead.

---

> [!NOTE]
> The project is under active development.

<br />

<p align="center">
  <a href="https://efp.app" target="_blank" rel="noopener noreferrer">
    <img width="275" src="https://docs.efp.app/logo.png" alt="EFP logo" />
  </a>
</p>

<p align="center">
  <a href="https://pr.new/ethereumfollowprotocol/app"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow" /></a>
  <a href="https://discord.com/invite/ZUyG3mSXFD"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat" /></a>
  <a href="https://x.com/efp"><img src="https://img.shields.io/twitter/follow/efp?label=%40efp&style=social&link=https%3A%2F%2Fx.com%2Fefp" alt="x account" /></a>
</p>

<h1 align="center" style="font-size: 2.75rem; font-weight: 900; color: white;">Ethereum Follow Protocol Web App</h1>

## Overview

The Ethereum Follow Protocol (EFP) is a native Ethereum protocol designed for following and tagging Ethereum addresses. This web application serves as the interface for interacting with the protocol, providing users with a seamless experience to manage their social graph on the blockchain.

## Important Links

- **Documentation**: [docs.efp.app](https://docs.efp.app)
- **Follow us on 𝕏**: [@efp](https://x.com/efp)
- **Join our Discord**: [Discord](https://discord.efp.app)

## Important links

- Documentation: [**docs.efp.app**](https://docs.efp.app)

## Getting started with development

### Prerequisites

- [Node.js LTS](https://nodejs.org/en) (LTS which is currently 20.x)
- [Bun runtime](https://bun.sh/) (latest version)

### Installation

```bash
git clone https://github.com/ethereumfollowprotocol/app.git && cd app
```

> [!NOTE]
> If vscode extensions behave weirdly or stops giving type hints, run ⌘+⇧+P and type `> Developer: Restart Extension Host` to restart the extension host.

```bash
# upgrade bun to make sure you have the latest version
bun upgrade
# then install all dependencies
bun install
```

### Environment Variables

```bash
cp .env.example .env
```

Now you should be able to run the following without getting any errors:

```bash
bun lint && bun format && bun typecheck && bun run build
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](../.github/CONTRIBUTING.md) for more details.

## Documentation

For comprehensive documentation about the Social Portfolio Platform features and architecture, see:

- [Architecture](./ARCHITECTURE.md) - System architecture and data flow
- [Features](./FEATURES.md) - Detailed feature specifications
- [API](./API.md) - API endpoints and integrations
- [Deployment](./DEPLOYMENT.md) - Deployment guide
- [Workflows](./WORKFLOWS.md) - CI/CD pipeline documentation
- [Monitoring](./MONITORING.md) - Monitoring and observability
- [SEO](./SEO.md) - SEO strategy and implementation
- [Contributing](./CONTRIBUTING.md) - Development guidelines

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more information.

## Contact

For any inquiries, please contact the project maintainer at [encrypted@ethfollow.xyz](mailto:encrypted@ethfollow.xyz).

---

Follow [**@efp**](https://x.com/efp) on **𝕏** for updates and join the [**Discord**](https://discord.efp.app) to get involved.

This README provides a comprehensive overview of the Ethereum Follow Protocol Web App, including setup instructions, important links, and contribution guidelines. Feel free to reach out if you have any questions or need further assistance.

## Quick Start

### Prerequisites
- Node.js 20.x LTS
- Bun runtime (latest version)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/SMSDAO/app.git
cd app

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Run development server
bun dev
```

### Building for Production

```bash
# Build the application
bun run build

# Start production server
bun start
```

## Project Structure

```
app/
├── docs/              # Documentation
├── src/
│   ├── api/          # API integrations
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility libraries
│   └── types/        # TypeScript type definitions
├── public/           # Static assets
└── .github/
    └── workflows/    # CI/CD workflows
```

## Documentation Index

- [Architecture](./ARCHITECTURE.md) - System architecture and data flow
- [Features](./FEATURES.md) - Detailed feature specifications
- [API](./API.md) - API endpoints and integrations
- [Deployment](./DEPLOYMENT.md) - Deployment guide
- [Workflows](./WORKFLOWS.md) - CI/CD pipeline documentation
- [Monitoring](./MONITORING.md) - Monitoring and observability
- [SEO](./SEO.md) - SEO strategy and implementation
- [Contributing](./CONTRIBUTING.md) - Development guidelines

## Key Features

### 🔗 Multi-Chain Wallet Integration
- Support for Ethereum, Solana, and other major chains
- Real-time token balance tracking
- NFT gallery across all wallets
- Comprehensive transaction history

### 📱 Social Timeline
- Farcaster integration for social frames and casts
- Lens Protocol for decentralized social
- Zora for NFT minting and collections
- Unified activity feed

### 🏛️ DAO Analytics
- DAO membership tracking
- Governance participation metrics
- Combined capital analysis
- Voting history visualization

### 🔍 SEO & Discovery
- On-chain identity sync (ENS, Unstoppable Domains, SNS)
- Profile claiming system
- Automatic search engine indexing
- Public profile pages

## Development Workflow

1. Create a feature branch from `main`
2. Implement changes with tests
3. Run linting and type checking: `bun lint && bun typecheck`
4. Build the project: `bun run build`
5. Submit a pull request
6. Wait for CI checks to pass
7. Auto-merge when approved

## Testing

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Generate coverage report
bun test --coverage
```

## Support

- **Documentation**: [docs.efp.app](https://docs.efp.app)
- **Discord**: [Discord](https://discord.efp.app)
- **Twitter/X**: [@efp](https://x.com/efp)

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
