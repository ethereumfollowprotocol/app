# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Essential Commands:**

- `bun install` - Install dependencies (project requires Bun runtime)
- `bun dev` - Start development server on port 3443
- `bun build` - Production build
- `bun lint` - Run ESLint
- `bun format` - Format code with Prettier
- `bun typecheck` - TypeScript type checking
- `bun check` - Run all checks (lint + format + typecheck + build)
- `bun fix` - Auto-fix linting and formatting issues

**Environment Setup:**

- Copy `.env.example` to `.env` before starting
- Requires Node.js LTS (20.x) and latest Bun runtime

## Architecture Overview

### Web3 Integration Stack

This is a sophisticated Ethereum social networking app built on multiple blockchain layers:

**Core Smart Contracts (EFP Protocol):**

- `EFPListRegistry` - NFT-based ownership of follow lists
- `EFPListRecords` - Stores follow/unfollow operations
- `EFPAccountMetadata` - User profile metadata
- `EFPListMinter` - Creates new follow lists

**Multi-Chain Architecture:**

- **Base** (primary chain, low fees)
- **Optimism** (L2 scaling)
- **Ethereum Mainnet** (core protocol)
- Contract addresses vary per chain (see `src/lib/constants/contracts.ts`)

**Web3 Stack:**

- Wagmi v2 + Viem v2 for Ethereum interactions
- RainbowKit for wallet connections
- Ethereum Identity Kit for ENS/identity management
- Thirdweb for additional web3 functionality

### State Management Architecture

**TanStack Query (React Query):**

- Primary data fetching and caching layer
- Infinite queries for paginated followers/following lists
- Optimistic updates for blockchain transactions
- Persistent caching with localStorage integration

**React Contexts:**

- `EFPProfileProvider` - Core user state, profiles, lists, follows
- `SoundsProvider` - Audio feedback system
- `RecommendedProfilesProvider` - Discovery and recommendations

### Key Patterns

**Dynamic User Routing:**

- `[user]` parameter accepts ENS names, addresses, or list IDs
- Automatic resolution and metadata generation
- SSR with proper social sharing metadata

**List Operations System:**

- Batch transactions for follow/unfollow operations
- Multi-chain operation support
- Permission-based UI (Owner/Manager/User roles)
- Optimistic UI updates with rollback capability

**Internationalization:**

- 70+ language variants including creative ones (pirate, shakespearean, corporate)
- React-i18next integration in `src/app/i18n.ts`
- Locale files in `public/locales/`

## Component Architecture

**Feature-Based Organization:**

- Components grouped by domain functionality
- Each major component has `components/`, `hooks/`, and `index.tsx`
- Shared utilities in `src/lib/` and `src/utils/`

**Key Component Patterns:**

- `profile-list/` - Core follow/unfollow management
- `user-profile-card/` - Profile display with achievements
- `top-eight/` - Featured follows functionality
- `leaderboard/` - Rankings and discovery
- `navigation/` - Header with wallet integration

**Data Fetching Patterns:**

- API layer organized by domain in `src/api/`
- Infinite scroll patterns for large lists
- Real-time updates via custom event system
- Graceful error handling and loading states

## Important Technical Details

**Type Safety:**

- Strict TypeScript configuration
- Full ABI type generation for smart contracts
- Viem's type-safe contract interactions
- Runtime validation with Valibot

**Performance Optimizations:**

- React 19 concurrent features enabled
- Dynamic imports for code splitting
- Batch RPC calls with fallback providers
- Connection state management for web3

**Security Features:**

- Comprehensive CSP headers in Next.js config
- Sentry integration for error tracking
- No sensitive data in client-side code
- Proper permission validation

## Development Guidelines

**When Working with Blockchain Features:**

- Always use the EFP Profile context for user-related state
- Route blockchain operations through the transaction context
- Test on multiple chains (Base primary, then Optimism/Mainnet)
- Consider gas costs and transaction batching
- Handle network failures gracefully

**When Adding New Features:**

- Follow existing infinite scroll patterns for lists
- Use TanStack Query for all data fetching
- Maintain multi-chain compatibility
- Add proper TypeScript types
- Consider internationalization for user-facing text
- Test wallet connection edge cases

**Code Patterns to Follow:**

- Use `ethereum-identity-kit` for ENS resolution
- Implement optimistic updates for better UX
- Follow existing error handling patterns
- Use the established loading state components
- Maintain accessibility standards

The codebase emphasizes type safety, performance, and user experience while handling the complexity of multi-chain blockchain interactions and real-time social networking features.
