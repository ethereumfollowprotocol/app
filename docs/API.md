# API Documentation

## Overview

This document describes all API endpoints and integrations for the Social Portfolio Platform.

## Internal API Routes

### Profile APIs

#### Get Profile
```
GET /api/profile/[address]
```

**Description**: Fetch profile data for a wallet address.

**Parameters**:
- `address` (string): Wallet address or ENS name

**Response**:
```json
{
  "address": "0x...",
  "ens": "vitalik.eth",
  "avatar": "https://...",
  "bio": "...",
  "social": {
    "farcaster": { ... },
    "lens": { ... },
    "twitter": "..."
  },
  "portfolio": {
    "totalValue": 1000000,
    "tokens": [...],
    "nfts": [...]
  }
}
```

#### Claim Profile
```
POST /api/profile/claim
```

**Description**: Claim a profile by proving wallet ownership.

**Body**:
```json
{
  "address": "0x...",
  "signature": "0x...",
  "message": "..."
}
```

**Response**:
```json
{
  "success": true,
  "profileId": "...",
  "claimedAt": "2024-01-01T00:00:00Z"
}
```

### Wallet APIs

#### Get Token Balances
```
GET /api/wallet/[address]/tokens?chains=ethereum,polygon
```

**Description**: Fetch token balances across multiple chains.

**Parameters**:
- `address` (string): Wallet address
- `chains` (string): Comma-separated list of chains

**Response**:
```json
{
  "address": "0x...",
  "chains": ["ethereum", "polygon"],
  "tokens": [
    {
      "address": "0x...",
      "symbol": "USDC",
      "name": "USD Coin",
      "decimals": 6,
      "balance": "1000000000",
      "balanceFormatted": "1000",
      "priceUSD": 1.00,
      "valueUSD": 1000,
      "chain": "ethereum",
      "logo": "https://..."
    }
  ],
  "totalValue": 1000
}
```

#### Get NFTs
```
GET /api/wallet/[address]/nfts?chains=ethereum
```

**Description**: Fetch NFTs owned by an address.

**Response**:
```json
{
  "address": "0x...",
  "nfts": [
    {
      "contract": "0x...",
      "tokenId": "1",
      "name": "Crypto Punk #1",
      "description": "...",
      "image": "https://...",
      "collection": {
        "name": "CryptoPunks",
        "floorPrice": 50
      },
      "chain": "ethereum"
    }
  ],
  "total": 100
}
```

#### Get Transactions
```
GET /api/wallet/[address]/transactions?chains=ethereum&limit=50
```

**Description**: Fetch transaction history.

**Response**:
```json
{
  "transactions": [
    {
      "hash": "0x...",
      "from": "0x...",
      "to": "0x...",
      "value": "1000000000000000000",
      "timestamp": 1640000000,
      "chain": "ethereum",
      "status": "confirmed",
      "type": "transfer"
    }
  ],
  "total": 1000
}
```

### Social APIs

#### Get Farcaster Profile
```
GET /api/social/farcaster/[fid]
```

**Description**: Fetch Farcaster profile and casts.

**Response**:
```json
{
  "fid": 3,
  "username": "vitalik",
  "displayName": "Vitalik Buterin",
  "bio": "...",
  "pfp": "https://...",
  "followers": 100000,
  "following": 500,
  "casts": [
    {
      "hash": "0x...",
      "text": "...",
      "timestamp": 1640000000,
      "reactions": {
        "likes": 100,
        "recasts": 50
      }
    }
  ]
}
```

#### Get Lens Profile
```
GET /api/social/lens/[handle]
```

**Description**: Fetch Lens Protocol profile and publications.

**Response**:
```json
{
  "id": "0x...",
  "handle": "vitalik.lens",
  "name": "Vitalik Buterin",
  "bio": "...",
  "picture": "https://...",
  "stats": {
    "totalFollowers": 50000,
    "totalFollowing": 100,
    "totalPosts": 500
  },
  "publications": [...]
}
```

#### Get Zora Creations
```
GET /api/social/zora/[address]
```

**Description**: Fetch Zora mints and creations.

**Response**:
```json
{
  "address": "0x...",
  "creations": [
    {
      "address": "0x...",
      "tokenId": "1",
      "name": "...",
      "creator": "0x...",
      "mintPrice": "0.01",
      "totalMinted": 100,
      "maxSupply": 1000
    }
  ]
}
```

### DAO APIs

#### Get DAO Memberships
```
GET /api/dao/[address]/memberships
```

**Description**: Fetch all DAO memberships for an address.

**Response**:
```json
{
  "address": "0x...",
  "memberships": [
    {
      "daoId": "...",
      "name": "Uniswap",
      "logo": "https://...",
      "tokenSymbol": "UNI",
      "votingPower": "1000",
      "delegatedTo": "0x...",
      "proposalsVoted": 50
    }
  ]
}
```

#### Get Governance Activity
```
GET /api/dao/[address]/activity
```

**Description**: Fetch governance participation history.

**Response**:
```json
{
  "address": "0x...",
  "votes": [
    {
      "proposalId": "...",
      "title": "...",
      "dao": "Uniswap",
      "choice": "For",
      "votingPower": "1000",
      "timestamp": 1640000000
    }
  ],
  "proposals": [...],
  "delegations": [...]
}
```

### Search APIs

#### Search Profiles
```
GET /api/search?q=vitalik&type=profile
```

**Description**: Search for profiles by name, address, or handle.

**Response**:
```json
{
  "results": [
    {
      "address": "0x...",
      "ens": "vitalik.eth",
      "displayName": "Vitalik Buterin",
      "avatar": "https://...",
      "verified": true
    }
  ],
  "total": 10
}
```

---

## External API Integrations

### Alchemy API

**Purpose**: Blockchain data indexing for Ethereum and EVM chains.

**Endpoints Used**:
- `alchemy_getTokenBalances`: Get token balances
- `alchemy_getTokenMetadata`: Get token metadata
- `getNFTs`: Get NFT collection
- `getAssetTransfers`: Get transaction history

**Configuration**:
```typescript
import { Alchemy, Network } from 'alchemy-sdk'

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
})
```

**Rate Limits**:
- Free tier: 300 requests/second
- Growth tier: 1,500 requests/second

### Helius API

**Purpose**: Solana blockchain data and RPC.

**Endpoints Used**:
- `getAsset`: Get NFT metadata
- `getAssetsByOwner`: Get all NFTs for an address
- `getTokenAccounts`: Get token accounts
- `getTransactions`: Get transaction history

**Configuration**:
```typescript
const helius = new Helius({
  apiKey: process.env.HELIUS_API_KEY,
  cluster: 'mainnet-beta',
})
```

### Farcaster Hub API

**Purpose**: Farcaster social data.

**Base URL**: `https://hub.farcaster.xyz`

**Endpoints**:
- `GET /v1/userDataByFid?fid={fid}`: Get user profile
- `GET /v1/castsByFid?fid={fid}`: Get user's casts
- `GET /v1/linksByFid?fid={fid}&link_type=follow`: Get social connections
- `GET /v1/reactionsByFid?fid={fid}`: Get user's reactions
- `SSE /v1/events`: Real-time updates

**Authentication**: None required for public endpoints

**Example**:
```typescript
const response = await fetch(`https://hub.farcaster.xyz/v1/userDataByFid?fid=3`)
const userData = await response.json()
```

### Lens Protocol API

**Purpose**: Lens social data.

**Base URL**: `https://api-v2.lens.dev`

**GraphQL API**:
```graphql
query Profile($request: ProfileRequest!) {
  profile(request: $request) {
    id
    handle
    metadata {
      displayName
      bio
      picture {
        optimized {
          uri
        }
      }
    }
    stats {
      followers
      following
      posts
    }
  }
}
```

**Authentication**: API key required for some operations

**Configuration**:
```typescript
const lensClient = new LensClient({
  environment: LensEnvironment.Polygon,
  apiKey: process.env.LENS_API_KEY,
})
```

### Zora API

**Purpose**: Zora NFT platform data.

**Base URL**: `https://api.zora.co`

**Endpoints**:
- `GET /user/{address}/tokens`: Get user's created tokens
- `GET /tokens/{address}/{tokenId}`: Get token details
- `GET /markets/{address}/{tokenId}`: Get market data

**GraphQL API**:
```graphql
query {
  tokens(where: { creator: "0x..." }) {
    nodes {
      address
      tokenId
      name
      description
      image {
        url
      }
    }
  }
}
```

### Snapshot API

**Purpose**: DAO governance data.

**Base URL**: `https://hub.snapshot.org/graphql`

**GraphQL Queries**:
```graphql
query Spaces {
  spaces(where: { members_in: ["0x..."] }) {
    id
    name
    about
    network
    symbol
    members
  }
}

query Proposals {
  proposals(where: { space: "uniswap.eth" }) {
    id
    title
    body
    choices
    start
    end
    state
  }
}

query Votes {
  votes(where: { voter: "0x..." }) {
    id
    voter
    choice
    proposal {
      id
      title
    }
  }
}
```

### Tally API

**Purpose**: On-chain governance data.

**Base URL**: `https://api.tally.xyz/query`

**GraphQL Queries**:
```graphql
query GovernancesByAccount($address: Address!) {
  account(address: $address) {
    participations {
      governance {
        name
        slug
        tokens {
          symbol
        }
      }
      votes {
        proposal {
          id
          title
        }
        support
      }
    }
  }
}
```

---

## Rate Limiting

### Internal API
- Rate limit: 100 requests per minute per IP
- Burst: 10 requests per second
- Headers:
  - `X-RateLimit-Limit`: Maximum requests per window
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when limit resets

### External APIs
- Cached responses to minimize external API calls
- Cache TTL:
  - Token balances: 5 minutes
  - NFT metadata: 15 minutes
  - Social posts: 10 minutes
  - DAO data: 30 minutes

---

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "INVALID_ADDRESS",
    "message": "The provided address is invalid",
    "details": {
      "address": "0xinvalid"
    }
  }
}
```

### Error Codes
- `INVALID_ADDRESS`: Invalid wallet address format
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `UNAUTHORIZED`: Authentication required
- `EXTERNAL_API_ERROR`: External API error
- `INTERNAL_ERROR`: Internal server error

---

## Authentication

### Wallet Authentication (SIWE)

**Flow**:
1. Client requests nonce: `GET /api/auth/nonce`
2. Client signs message with wallet
3. Client sends signature: `POST /api/auth/verify`
4. Server verifies signature and creates session

**Sign-In Message Format**:
```
efp.app wants you to sign in with your Ethereum account:
0x1234...

By signing, you agree to our Terms of Service.

URI: https://efp.app
Version: 1
Chain ID: 1
Nonce: abc123
Issued At: 2024-01-01T00:00:00Z
```

### API Key Authentication

For programmatic access:
```
Authorization: Bearer YOUR_API_KEY
```

---

## Webhooks

### Profile Update Webhook
```
POST {webhook_url}
```

**Payload**:
```json
{
  "event": "profile.updated",
  "address": "0x...",
  "changes": {
    "bio": "New bio",
    "avatar": "https://..."
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### New Activity Webhook
```
POST {webhook_url}
```

**Payload**:
```json
{
  "event": "activity.new",
  "address": "0x...",
  "activity": {
    "type": "cast",
    "platform": "farcaster",
    "content": "..."
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import { SocialPortfolioClient } from '@efp/sdk'

const client = new SocialPortfolioClient({
  apiKey: 'YOUR_API_KEY',
})

// Get profile
const profile = await client.profile.get('vitalik.eth')

// Get token balances
const tokens = await client.wallet.getTokens('0x...', ['ethereum', 'polygon'])

// Get social timeline
const timeline = await client.social.getTimeline('0x...', {
  platforms: ['farcaster', 'lens'],
  limit: 50,
})
```

### Python

```python
from efp import SocialPortfolioClient

client = SocialPortfolioClient(api_key='YOUR_API_KEY')

# Get profile
profile = client.profile.get('vitalik.eth')

# Get token balances
tokens = client.wallet.get_tokens('0x...', chains=['ethereum', 'polygon'])

# Get DAO memberships
daos = client.dao.get_memberships('0x...')
```

---

## OpenAPI Specification

Full OpenAPI/Swagger documentation available at:
- Development: `http://localhost:3443/api/docs`
- Production: `https://efp.app/api/docs`
