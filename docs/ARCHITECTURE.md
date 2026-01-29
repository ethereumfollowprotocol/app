# System Architecture

## Overview

The Social Portfolio Platform is built on Next.js 15 with React 19, utilizing a modern, serverless architecture optimized for performance and scalability.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Next.js 15  │  │  React 19    │  │  TailwindCSS │      │
│  │  App Router  │  │  Components  │  │  Styling     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   API Routes │  │  Server      │  │  Middleware  │      │
│  │              │  │  Components  │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Integration Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Blockchain  │  │   Social     │  │     DAO      │      │
│  │   APIs       │  │   APIs       │  │    APIs      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  • Viem/Wagmi (Ethereum)    • Farcaster API                 │
│  • Solana Web3.js           • Lens Protocol                 │
│  • Alchemy/Helius           • Zora API                      │
│  • RainbowKit               • Snapshot API                  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Cache      │  │   Indexing   │  │  On-Chain    │      │
│  │  (Browser)   │  │   Workers    │  │    Data      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### Frontend Architecture

#### Next.js App Router
- **Server Components**: Default server-side rendering for optimal performance
- **Client Components**: Interactive UI elements with React 19 features
- **Route Handlers**: API endpoints for data fetching and mutations
- **Middleware**: Authentication, rate limiting, and request processing

#### State Management
- **TanStack Query**: Server state management and caching
- **React Context**: Global app state (theme, wallet connection)
- **Local Storage**: Persistent client-side data via localforage

#### Styling System
- **Tailwind CSS 4**: Utility-first CSS framework
- **Neo Glow Design**: Custom gradient and glow effects
- **AuraFX**: Animation system for smooth transitions
- **next-themes**: Dark/light mode management

### Backend Architecture

#### API Layer
```typescript
src/api/
├── wallet/           # Multi-chain wallet operations
├── social/           # Social platform integrations
├── dao/              # DAO analytics and governance
├── profile/          # Profile management
└── search/           # Search and discovery
```

#### Data Flow

1. **Request Flow**:
   ```
   Client → Middleware → Route Handler → API Integration → Response
   ```

2. **Caching Strategy**:
   ```
   Browser Cache → TanStack Query → API Response → On-Chain Data
   ```

3. **Real-time Updates**:
   ```
   WebSocket/SSE → Event Handler → State Update → UI Re-render
   ```

### Integration Architecture

#### Blockchain Integrations

**Ethereum (EVM Chains)**
- **Viem**: Low-level Ethereum interactions
- **Wagmi**: React hooks for blockchain operations
- **RainbowKit**: Wallet connection UI
- **Alchemy**: Blockchain indexing and APIs

**Solana**
- **@solana/web3.js**: Solana blockchain interactions
- **Helius**: Solana indexing and RPC
- **Metaplex**: NFT standard integration

#### Social Platform Integrations

**Farcaster**
```typescript
// Farcaster Hub API integration
interface FarcasterIntegration {
  fetchCasts: (fid: number) => Promise<Cast[]>
  fetchFollowers: (fid: number) => Promise<Follower[]>
  streamUpdates: (fid: number) => EventSource
}
```

**Lens Protocol**
```typescript
// Lens GraphQL API integration
interface LensIntegration {
  fetchPosts: (profileId: string) => Promise<Post[]>
  fetchFollowers: (profileId: string) => Promise<Profile[]>
  fetchCollects: (profileId: string) => Promise<Collect[]>
}
```

**Zora**
```typescript
// Zora API integration
interface ZoraIntegration {
  fetchMints: (address: string) => Promise<Mint[]>
  fetchCollections: (address: string) => Promise<Collection[]>
  fetchCreations: (address: string) => Promise<Creation[]>
}
```

#### DAO Analytics

**Snapshot Integration**
```typescript
interface SnapshotIntegration {
  fetchSpaces: (address: string) => Promise<Space[]>
  fetchProposals: (spaceId: string) => Promise<Proposal[]>
  fetchVotes: (address: string) => Promise<Vote[]>
}
```

**Tally Integration**
```typescript
interface TallyIntegration {
  fetchDAOs: (address: string) => Promise<DAO[]>
  fetchProposals: (daoId: string) => Promise<Proposal[]>
  fetchDelegations: (address: string) => Promise<Delegation[]>
}
```

## Data Models

### Wallet Portfolio
```typescript
interface WalletPortfolio {
  address: string
  chains: ChainBalance[]
  tokens: Token[]
  nfts: NFT[]
  transactions: Transaction[]
  totalValue: number
  performance: PerformanceMetrics
}
```

### Social Profile
```typescript
interface SocialProfile {
  address: string
  ens: string | null
  farcaster: FarcasterProfile | null
  lens: LensProfile | null
  zora: ZoraProfile | null
  activities: Activity[]
  followers: number
  following: number
}
```

### DAO Membership
```typescript
interface DAOMembership {
  address: string
  daos: DAO[]
  proposals: Proposal[]
  votes: Vote[]
  delegations: Delegation[]
  votingPower: VotingPower[]
  participation: ParticipationMetrics
}
```

## Performance Optimization

### Caching Strategy
- **Browser Cache**: Static assets (images, fonts, icons)
- **Query Cache**: API responses via TanStack Query (5-minute TTL)
- **On-Chain Cache**: Blockchain data (15-minute TTL)
- **CDN**: Edge caching for static content

### Code Splitting
- Route-based code splitting via Next.js
- Dynamic imports for heavy components
- Lazy loading for images and media

### Server-Side Rendering
- Static generation for public profiles
- Incremental static regeneration (ISR) for dynamic content
- Server components for data-heavy pages

## Security

### Authentication
- Wallet-based authentication (Sign-In with Ethereum)
- Session management via secure HTTP-only cookies
- CSRF protection

### Data Protection
- Environment variable encryption
- API key rotation
- Rate limiting on all endpoints
- Input validation and sanitization

## Monitoring & Observability

### Error Tracking
- Sentry integration for error reporting
- Custom error boundaries
- Structured logging

### Performance Monitoring
- Core Web Vitals tracking
- API response time monitoring
- Database query performance

### Analytics
- User behavior tracking
- Feature usage metrics
- Conversion funnels

## Scalability

### Horizontal Scaling
- Serverless functions via Vercel
- Auto-scaling based on traffic
- Edge computing for global distribution

### Background Workers
- Portfolio indexing workers
- Social feed update workers
- SEO ping workers
- Health check workers

## Deployment Architecture

```
GitHub → CI/CD Pipeline → Vercel Edge Network → Global CDN
   │            │
   │            ├─ Lint & Type Check
   │            ├─ Build & Test
   │            ├─ Security Scan
   │            └─ Deploy
   │
   └─ Auto-merge on success
```

## Technology Stack

### Core Technologies
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, PostCSS
- **State**: TanStack Query, React Context
- **Blockchain**: Viem, Wagmi, RainbowKit, Solana Web3.js
- **Forms**: React Hook Form, Valibot
- **Animations**: React Spring, AuraFX

### Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Testing**: Vitest, Testing Library

### Infrastructure
- **Hosting**: Vercel
- **Monitoring**: Sentry
- **Analytics**: Vercel Analytics
- **CI/CD**: GitHub Actions
