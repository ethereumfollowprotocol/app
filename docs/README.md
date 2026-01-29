# Social Portfolio Platform - Documentation

Welcome to the Social Portfolio Platform documentation. This platform is a comprehensive "Social Wallet" solution that integrates multi-chain portfolio tracking, social timelines, DAO analytics, and SEO-optimized profile claiming.

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
