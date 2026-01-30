# SMSDAO Social Portfolio Platform — Full Architecture & Specs

This document is the **canonical, low‑level specification** for the Social Portfolio Platform.  
It extends `ARCHITECTURE.md` with concrete contracts, flows, invariants, and system‑level guarantees.

---

# 1. Runtime & Framework Specs

## 1.1 Core Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (strict mode)
- **Runtime:** Bun
- **Styling:** Tailwind CSS 4
- **State:** TanStack Query + React Context
- **Forms:** React Hook Form + schema validation
- **Animations:** AuraFX / React Spring
- **Hosting:** Vercel (Edge + Serverless Functions)

## 1.2 Non‑Negotiable Invariants

- All routes must be **App Router** (`src/app/**`)
- All new code must be **TypeScript**
- All components must be **function components**
- No implicit `any`
- No untyped `fetch` — all responses must be typed
- No business logic inside components
- No direct RPC calls inside UI

---

# 2. Application Layer Specs

## 2.1 Route Topology

src/app/
├── layout.tsx
├── page.tsx                                          # Landing / home
├── [user]/page.tsx              # User profile
├── leaderboard/page.tsx         # Leaderboard
├── swipe/page.tsx               # Swipe UX
├── team/page.tsx                # Team
├── api/
│   ├── address/route.ts         # Address/identity resolution
│   ├── top-eight/route.tsx      # Top Eight management
│   └── ...                      # Future routes
├── manifest.ts                                    # PWA manifest
├── robots.ts                                        # robots.txt
└── sitemap.ts                                      # sitemap.xml

Code

## 2.2 Middleware

**Location:** `src/middleware.ts`

### Responsibilities

- Locale detection  
- Header shaping  
- Optional auth gating  
- No DB calls  
- No RPC calls  
- No heavy logic  

---

# 3. Integration Layer Specs

## 3.1 Blockchain Integrations

### Libraries

- `viem` — low‑level EVM RPC
- `wagmi` — React hooks for wallet & contracts
- `RainbowKit` — wallet UI (optional)

### Constraints

- All on‑chain calls must go through:
  - `src/utils/viem.ts`
  - `src/lib/wagmi.ts`
- No raw RPC URLs in components
- All contract addresses & chain IDs must live in constants

---

## 3.2 Social Integrations (Future‑Facing)

The platform is designed to support:

- Farcaster  
- Lens  
- Zora  
- Other creator/social protocols  

### Rule  
All external APIs must be wrapped in integration modules under:

src/lib/integrations/*

Code

Never called directly from components.

---

# 4. Data Layer Specs

## 4.1 Redis

**Location:** `src/lib/redis.ts`

### Usage

- Caching expensive reads  
- Caching profile lookups  
- Caching leaderboard results  
- Rate‑limit tokens (optional)  

### Rules

- No direct Redis usage in components  
- Only API routes & server utilities may access Redis  

---

## 4.2 CSV Datasets

**Location:** `src/data/accounts.csv` (and others)

### Rules

- Treated as read‑only fixtures  
- Loaded via utilities  
- Never parsed directly in components  
- Must have documented schema in `docs/specs/data-models.md`  

---

# 5. API Specs

## 5.1 General Rules

All routes live under:

src/app/api/**

Code

All routes must:

- Validate input  
- Return typed JSON  
- Handle errors gracefully  
- Avoid leaking internal errors  
- Use deterministic response shapes  

---

## 5.2 Example Contracts

### `/api/address`

**Purpose:** Resolve address → identity/profile.

**Input:**

```ts
type AddressRequest = {
  address: string;
};
Output:

ts
type AddressResponse = {
  address: string;
  ens?: string | null;
  profile?: {
    name?: string | null;
    avatarUrl?: string | null;
  };
  chains: Array<{
    chainId: number;
    label: string;
    hasActivity: boolean;
  }>;
};
/api/top-eight
Purpose: Manage a user’s Top Eight social slots.

Input:

ts
type TopEightUpdateRequest = {
  address: string;
  slots: string[];
};
Output:

ts
type TopEightResponse = {
  address: string;
  slots: string[];
  updatedAt: string;
};
6. UI & Component Specs
6.1 Component Categories
Layout & Navigation
Navigation bar

Mobile/desktop variants

Profile
Profile card

Profile summary

Activity feed

Top Eight
Editor modal

Display grid

Search
Search bar

Result list

Notifications / Push
Setup modal

Permission prompts

6.2 Component Rules
All components must:

Be typed with explicit props

Avoid side effects in render

Use hooks for data fetching

Be accessible (labels, roles, keyboard navigation)

Avoid inline business logic

7. State & Caching Specs
7.1 TanStack Query
Used for:

Profile data

Leaderboards

Search results

Rules
Query keys must be stable

Stale time must be documented

No infinite stale unless justified

7.2 Local Storage / Client Cache
Only for:

Theme

Lightweight preferences

Non‑sensitive UI state

Never store:

Secrets

Tokens

Private keys

8. Performance & Optimization Specs
Route‑level code splitting

Dynamic imports for heavy components

Use <Image> for all images

Expensive operations must be cached or offloaded

Avoid blocking the main thread

9. Security & Governance Specs
9.1 Security
Validate all inputs

Never trust client data

Rate limit:

Search

Profile lookups

Enumeration endpoints

9.2 Governance
Additive‑only changes unless approved

No silent logic removal

All new features must be documented

CI must remain green for merges

10. CI/CD & Release Specs
Required Checks
Type check

Lint

Tests

Security scan

Docs build

AI review (advisory but preferred green)

Release Flow
Code
PR → all checks green → merge → deploy
Hotfixes must still pass type + lint.

11. Future Extensions
/docs/specs/data-models.md

/docs/api/*.md

/docs/workflows/release-process.md

/docs/integrations/*.md
