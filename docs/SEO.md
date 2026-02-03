# SEO Strategy and Implementation

## Overview

This document outlines the SEO strategy for the Social Portfolio Platform, including technical implementation, search engine optimization, and profile discovery.

## Core SEO Objectives

1. **Profile Discovery**: Make user profiles discoverable via search engines
2. **Brand Visibility**: Establish platform authority in Web3 social space
3. **Organic Traffic**: Drive traffic through search results
4. **User Acquisition**: Convert search traffic to registered users

## Technical SEO Implementation

### Meta Tags

#### Dynamic Meta Tags for Profiles

```typescript
// src/app/profile/[address]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { address: string } }): Promise<Metadata> {
  const profile = await fetchProfile(params.address)
  
  return {
    title: `${profile.displayName || profile.ens || profile.address} | Social Portfolio`,
    description: `View ${profile.displayName}'s Web3 portfolio, social activity, and DAO memberships. Track tokens, NFTs, and on-chain interactions.`,
    keywords: [
      profile.ens,
      'web3 profile',
      'ethereum portfolio',
      'crypto wallet',
      'nft gallery',
      'dao membership'
    ],
    authors: [{ name: 'EFP' }],
    creator: 'Ethereum Follow Protocol',
    publisher: 'EFP',
    
    // Open Graph
    openGraph: {
      type: 'profile',
      title: `${profile.displayName || profile.ens} - Social Portfolio`,
      description: `Web3 portfolio and social activity for ${profile.displayName}`,
      url: `https://efp.app/profile/${profile.ens || params.address}`,
      siteName: 'Social Portfolio Platform',
      images: [
        {
          url: profile.avatar || `https://efp.app/api/og?address=${params.address}`,
          width: 1200,
          height: 630,
          alt: `${profile.displayName} profile picture`,
        },
      ],
      locale: 'en_US',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${profile.displayName || profile.ens} - Social Portfolio`,
      description: `Web3 portfolio and social activity`,
      site: '@efp',
      creator: '@efp',
      images: [profile.avatar || `https://efp.app/api/og?address=${params.address}`],
    },
    
    // Additional
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      other: {
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
      },
    },
  }
}
```

### Structured Data (JSON-LD)

```typescript
// src/components/structured-data.tsx
export function ProfileStructuredData({ profile }: { profile: Profile }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.displayName || profile.ens || 'Anonymous',
    url: `https://efp.app/profile/${profile.ens || profile.address}`,
    image: profile.avatar,
    description: profile.bio,
    sameAs: [
      profile.social?.twitter && `https://twitter.com/${profile.social.twitter}`,
      profile.social?.github && `https://github.com/${profile.social.github}`,
      profile.social?.farcaster && `https://warpcast.com/${profile.social.farcaster}`,
    ].filter(Boolean),
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Ethereum Address',
      value: profile.address,
    },
    owns: profile.nfts?.slice(0, 5).map(nft => ({
      '@type': 'DigitalArt',
      name: nft.name,
      image: nft.image,
      url: nft.openseaUrl,
    })),
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

### Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all claimed profiles
  const profiles = await fetchClaimedProfiles()
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://efp.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://efp.app/leaderboard',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://efp.app/team',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
  
  // Profile pages
  const profilePages: MetadataRoute.Sitemap = profiles.map(profile => ({
    url: `https://efp.app/profile/${profile.ens || profile.address}`,
    lastModified: new Date(profile.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  
  return [...staticPages, ...profilePages]
}
```

### Robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
    ],
    sitemap: 'https://efp.app/sitemap.xml',
    host: 'https://efp.app',
  }
}
```

## Search Engine Submission

### Google Search Console

#### Setup

1. **Verify Ownership**:
   - Add verification meta tag to `<head>`
   - Or upload verification file to `/public`

2. **Submit Sitemap**:
   ```bash
   https://search.google.com/search-console
   → Sitemaps
   → Add new sitemap: https://efp.app/sitemap.xml
   ```

3. **Configure Settings**:
   - Set target country: United States (or International)
   - Set target language: English
   - Enable mobile-first indexing

#### API Integration

```typescript
// src/lib/seo/google.ts
export async function submitToGoogle(urls: string[]) {
  const auth = await getGoogleAuth()
  
  for (const url of urls) {
    try {
      await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.access_token}`,
        },
        body: JSON.stringify({
          url,
          type: 'URL_UPDATED',
        }),
      })
      
      console.log(`Submitted to Google: ${url}`)
    } catch (error) {
      console.error(`Failed to submit ${url}:`, error)
    }
  }
}
```

### Bing Webmaster Tools

```typescript
// src/lib/seo/bing.ts
export async function submitToBing(urls: string[]) {
  const apiKey = process.env.BING_WEBMASTER_KEY
  const siteUrl = 'https://efp.app'
  
  try {
    await fetch(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch?apikey=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteUrl,
        urlList: urls,
      }),
    })
    
    console.log(`Submitted ${urls.length} URLs to Bing`)
  } catch (error) {
    console.error('Bing submission failed:', error)
  }
}
```

### IndexNow Protocol

```typescript
// src/lib/seo/indexnow.ts
export async function submitToIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY
  
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'efp.app',
        key,
        keyLocation: `https://efp.app/${key}.txt`,
        urlList: urls,
      }),
    })
    
    console.log(`Submitted ${urls.length} URLs via IndexNow`)
  } catch (error) {
    console.error('IndexNow submission failed:', error)
  }
}
```

### Automated Submission Workflow

```typescript
// src/lib/seo/auto-submit.ts
export async function autoSubmitProfile(address: string, ens?: string) {
  const url = `https://efp.app/profile/${ens || address}`
  
  // Submit to all search engines
  await Promise.allSettled([
    submitToGoogle([url]),
    submitToBing([url]),
    submitToIndexNow([url]),
  ])
  
  // Log submission
  console.log(`Submitted profile to search engines: ${url}`)
  
  // Track in database
  await trackSEOSubmission({
    url,
    address,
    submittedAt: new Date(),
  })
}
```

## Content Optimization

### Profile Page Structure

```html
<article>
  <header>
    <h1>{{displayName}} (@{{ens}})</h1>
    <img src="{{avatar}}" alt="{{displayName}} avatar" />
    <p>{{bio}}</p>
  </header>
  
  <section id="portfolio">
    <h2>Portfolio Overview</h2>
    <!-- Token balances, total value -->
  </section>
  
  <section id="nfts">
    <h2>NFT Collection</h2>
    <!-- NFT gallery -->
  </section>
  
  <section id="social">
    <h2>Social Activity</h2>
    <!-- Farcaster, Lens, Zora feeds -->
  </section>
  
  <section id="dao">
    <h2>DAO Memberships</h2>
    <!-- DAO list and governance activity -->
  </section>
</article>
```

### Keyword Strategy

**Primary Keywords**:
- Web3 portfolio
- Crypto wallet tracker
- NFT gallery
- DAO analytics
- Blockchain portfolio
- Ethereum profile

**Long-tail Keywords**:
- "Track Ethereum wallet portfolio"
- "View NFTs across all wallets"
- "DAO membership tracker"
- "Multi-chain crypto portfolio"
- "Farcaster profile viewer"

### Content Guidelines

1. **Unique Content**: Each profile page must have unique, descriptive content
2. **Rich Media**: Include images (avatars, NFTs) with proper alt text
3. **Internal Links**: Link between related profiles and features
4. **Fresh Content**: Update profiles regularly with new activity
5. **Mobile-First**: Ensure mobile-friendly design

## Performance Optimization

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src={nft.image}
  alt={nft.name}
  width={300}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL={nft.thumbnail}
/>
```

### Code Splitting

```typescript
// Dynamic imports for heavy components
const NFTGallery = dynamic(() => import('@/components/nft-gallery'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

## Link Building Strategy

### Internal Linking

- Profile → Related profiles (mutual followers)
- Profile → DAO pages
- Profile → NFT collections
- Leaderboard → Top profiles
- Blog posts → Relevant profiles

### External Links

- GitHub profiles
- Twitter/X accounts
- Farcaster profiles
- Lens handles
- DAO websites

### Backlink Opportunities

- Web3 directories
- Crypto news sites
- NFT marketplaces
- DAO platforms
- Social media

## Analytics & Tracking

### Google Analytics 4

```typescript
// src/lib/analytics.ts
export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    })
  }
}

export function trackEvent(name: string, params: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params)
  }
}

// Track profile views
trackEvent('profile_view', {
  address: profile.address,
  ens: profile.ens,
  has_nfts: profile.nfts.length > 0,
})
```

### Search Console Metrics

Monitor in Google Search Console:
- Impressions
- Clicks
- Average position
- CTR (Click-through rate)
- Top queries
- Top pages

### Goals

- **Organic traffic**: 10,000+ monthly visits
- **Indexed profiles**: 100,000+ profiles
- **Average position**: Top 10 for primary keywords
- **CTR**: > 3% for profile pages

## Schema Markup

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Social Portfolio Platform",
  "url": "https://efp.app",
  "logo": "https://efp.app/logo.png",
  "sameAs": [
    "https://twitter.com/efp",
    "https://discord.com/invite/ZUyG3mSXFD",
    "https://github.com/ethereumfollowprotocol"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "encrypted@ethfollow.xyz",
    "contactType": "Customer Support"
  }
}
```

### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://efp.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Profiles",
      "item": "https://efp.app/profiles"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "vitalik.eth",
      "item": "https://efp.app/profile/vitalik.eth"
    }
  ]
}
```

## Ongoing Optimization

### Monthly Tasks

- [ ] Review Search Console performance
- [ ] Analyze top-performing pages
- [ ] Identify ranking opportunities
- [ ] Update meta descriptions for low-CTR pages
- [ ] Check for indexing issues
- [ ] Monitor Core Web Vitals
- [ ] Review backlink profile

### Quarterly Tasks

- [ ] Comprehensive SEO audit
- [ ] Update keyword strategy
- [ ] Review competitor rankings
- [ ] Optimize underperforming pages
- [ ] Create new content based on search trends
- [ ] Update structured data

## Tools & Resources

**SEO Tools**:
- Google Search Console
- Bing Webmaster Tools
- Ahrefs / SEMrush
- Lighthouse
- PageSpeed Insights

**Monitoring**:
- Google Analytics 4
- Vercel Analytics
- Sentry Performance

**Testing**:
- Rich Results Test (Google)
- Mobile-Friendly Test
- Schema Markup Validator

## Success Metrics

**Short-term (3 months)**:
- 1,000+ indexed profiles
- 1,000+ monthly organic visits
- Top 30 for primary keywords

**Medium-term (6 months)**:
- 10,000+ indexed profiles
- 10,000+ monthly organic visits
- Top 10 for primary keywords
- 100+ referring domains

**Long-term (12 months)**:
- 100,000+ indexed profiles
- 100,000+ monthly organic visits
- #1 for "web3 portfolio tracker"
- 500+ referring domains
