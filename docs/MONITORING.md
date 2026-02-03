# Monitoring and Observability

## Overview

This document describes the monitoring, logging, alerting, and self-healing capabilities of the Social Portfolio Platform.

## Error Tracking

### Sentry Integration

The platform uses Sentry for error tracking and performance monitoring.

#### Configuration

Sentry is already configured in:
- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking

#### Features

**Error Tracking**:
- Automatic error capture
- Stack traces with source maps
- User context (wallet address, session data)
- Breadcrumbs for debugging
- Release tracking

**Performance Monitoring**:
- Transaction tracing
- API endpoint monitoring
- Database query performance
- External API call tracking

#### Usage

```typescript
import * as Sentry from '@sentry/nextjs'

// Capture exception
try {
  // Code that might throw
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      feature: 'wallet-connection',
      chain: 'ethereum'
    },
    extra: {
      address: userAddress,
      timestamp: Date.now()
    }
  })
}

// Track performance
const transaction = Sentry.startTransaction({
  name: 'Fetch Portfolio',
  op: 'api.call'
})

// ... perform operation

transaction.finish()
```

## Application Performance Monitoring (APM)

### Core Web Vitals

Track critical performance metrics:

**Metrics**:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 800ms
- **FCP** (First Contentful Paint): < 1.8s

**Implementation**:
```typescript
// src/lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function reportWebVitals(metric: any) {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
  
  // Send to Sentry
  Sentry.captureMessage(`Web Vital: ${metric.name}`, {
    level: 'info',
    extra: metric
  })
}

// Track vitals
getCLS(reportWebVitals)
getFID(reportWebVitals)
getFCP(reportWebVitals)
getLCP(reportWebVitals)
getTTFB(reportWebVitals)
```

### API Performance Monitoring

**Endpoints to Monitor**:
- `/api/profile/[address]` - Target: < 500ms
- `/api/wallet/[address]/tokens` - Target: < 1s
- `/api/wallet/[address]/nfts` - Target: < 2s
- `/api/social/farcaster/[fid]` - Target: < 800ms
- `/api/dao/[address]/memberships` - Target: < 1.5s

**Implementation**:
```typescript
// Middleware for API monitoring
export async function monitoredAPICall<T>(
  endpoint: string,
  fn: () => Promise<T>
): Promise<T> {
  const startTime = performance.now()
  
  try {
    const result = await fn()
    const duration = performance.now() - startTime
    
    // Log slow requests
    if (duration > 1000) {
      console.warn(`Slow API call: ${endpoint} took ${duration}ms`)
      Sentry.captureMessage(`Slow API: ${endpoint}`, {
        level: 'warning',
        extra: { duration, endpoint }
      })
    }
    
    return result
  } catch (error) {
    const duration = performance.now() - startTime
    
    Sentry.captureException(error, {
      tags: { endpoint },
      extra: { duration }
    })
    
    throw error
  }
}
```

## Logging

### Structured Logging

Use structured logging for better debugging:

```typescript
// src/lib/logger.ts
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  browser: {
    asObject: true
  },
  formatters: {
    level: (label) => {
      return { level: label }
    }
  }
})

export function log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
  logger[level]({ ...data, timestamp: new Date().toISOString() }, message)
}

// Usage
log('info', 'User connected wallet', { 
  address: '0x...', 
  chain: 'ethereum' 
})

log('error', 'Failed to fetch tokens', { 
  address: '0x...', 
  error: error.message 
})
```

### Log Levels

- **error**: Critical errors requiring immediate attention
- **warn**: Warning messages (slow responses, deprecated features)
- **info**: Informational messages (user actions, system events)
- **debug**: Detailed debugging information (development only)

### Log Aggregation

**Production Logging**:
- All logs sent to Sentry
- Critical errors trigger alerts
- Daily log summaries

**Development Logging**:
- Console logging with `pino-pretty`
- Detailed stack traces
- Performance timing

## Health Checks

### Health Check Endpoint

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    status: 'healthy',
    checks: {
      api: await checkAPIHealth(),
      blockchain: await checkBlockchainHealth(),
      database: await checkDatabaseHealth(),
      cache: await checkCacheHealth(),
    }
  }
  
  const allHealthy = Object.values(checks.checks).every(c => c.healthy)
  
  return NextResponse.json(checks, {
    status: allHealthy ? 200 : 503
  })
}

async function checkAPIHealth() {
  try {
    // Quick API check
    return { healthy: true, responseTime: 10 }
  } catch (error) {
    return { healthy: false, error: error.message }
  }
}

async function checkBlockchainHealth() {
  try {
    // Check Alchemy/Helius connection
    return { healthy: true, blockNumber: 12345678 }
  } catch (error) {
    return { healthy: false, error: error.message }
  }
}

async function checkDatabaseHealth() {
  try {
    // Database ping
    return { healthy: true, latency: 5 }
  } catch (error) {
    return { healthy: false, error: error.message }
  }
}

async function checkCacheHealth() {
  try {
    // Redis/cache check
    return { healthy: true, hitRate: 0.85 }
  } catch (error) {
    return { healthy: false, error: error.message }
  }
}
```

### Status Page

```typescript
// src/app/api/status/route.ts
export async function GET() {
  return NextResponse.json({
    status: 'operational',
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'dev',
    environment: process.env.NODE_ENV,
    services: {
      api: 'operational',
      blockchain: 'operational',
      social: 'operational',
      dao: 'operational',
    },
    metrics: {
      requestsPerMinute: 1000,
      averageResponseTime: 250,
      errorRate: 0.001,
    }
  })
}
```

## Alerting

### Alert Channels

**Critical Alerts** (immediate notification):
- Application down
- API error rate > 5%
- Database connection lost
- Security breach detected

**Warning Alerts** (hourly digest):
- API response time > 2s
- Error rate > 1%
- Cache hit rate < 70%
- Memory usage > 80%

### Slack Integration

```typescript
// src/lib/alerts.ts
export async function sendSlackAlert(severity: 'critical' | 'warning', message: string, data?: any) {
  const webhook = process.env.SLACK_WEBHOOK
  
  if (!webhook) return
  
  const color = severity === 'critical' ? 'danger' : 'warning'
  
  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      attachments: [{
        color,
        title: severity.toUpperCase(),
        text: message,
        fields: Object.entries(data || {}).map(([key, value]) => ({
          title: key,
          value: String(value),
          short: true
        })),
        footer: 'Social Portfolio Platform',
        ts: Math.floor(Date.now() / 1000)
      }]
    })
  })
}

// Usage
await sendSlackAlert('critical', 'API Error Rate Exceeded', {
  errorRate: '5.2%',
  endpoint: '/api/wallet/tokens',
  duration: '5 minutes'
})
```

### Discord Integration

```typescript
export async function sendDiscordAlert(severity: 'critical' | 'warning', message: string) {
  const webhook = process.env.DISCORD_WEBHOOK
  
  if (!webhook) return
  
  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `**${severity.toUpperCase()}**: ${message}`,
      embeds: [{
        color: severity === 'critical' ? 0xFF0000 : 0xFFA500,
        timestamp: new Date().toISOString()
      }]
    })
  })
}
```

## Self-Healing Capabilities

### Automatic Error Recovery

Inspired by algobraindoctor.git patterns:

```typescript
// src/lib/self-healing.ts
export class SelfHealingService {
  private errorCount = new Map<string, number>()
  private lastReset = Date.now()
  
  async execute<T>(
    operationName: string,
    operation: () => Promise<T>,
    options: {
      maxRetries?: number
      backoff?: boolean
      fallback?: () => Promise<T>
    } = {}
  ): Promise<T> {
    const { maxRetries = 3, backoff = true, fallback } = options
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation()
        
        // Reset error count on success
        this.errorCount.set(operationName, 0)
        
        return result
      } catch (error) {
        const count = (this.errorCount.get(operationName) || 0) + 1
        this.errorCount.set(operationName, count)
        
        // Log error
        log('warn', `Operation failed: ${operationName}`, {
          attempt,
          maxRetries,
          error: error.message
        })
        
        // Last attempt
        if (attempt === maxRetries) {
          // Try fallback if available
          if (fallback) {
            log('info', `Using fallback for ${operationName}`)
            return await fallback()
          }
          
          // Alert if error rate is high
          if (count > 10) {
            await sendSlackAlert('critical', `High error rate for ${operationName}`, {
              count,
              timeWindow: '1 hour'
            })
          }
          
          throw error
        }
        
        // Backoff before retry
        if (backoff) {
          await this.sleep(Math.pow(2, attempt) * 1000)
        }
      }
    }
    
    throw new Error(`Failed after ${maxRetries} attempts`)
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// Usage
const healer = new SelfHealingService()

const tokens = await healer.execute(
  'fetchTokens',
  () => fetchTokensFromAPI(address),
  {
    maxRetries: 3,
    backoff: true,
    fallback: () => fetchTokensFromCache(address)
  }
)
```

### Circuit Breaker Pattern

```typescript
// src/lib/circuit-breaker.ts
export class CircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'
  
  constructor(
    private threshold: number = 5,
    private timeout: number = 60000
  ) {}
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open'
      } else {
        throw new Error('Circuit breaker is open')
      }
    }
    
    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }
  
  private onSuccess() {
    this.failures = 0
    this.state = 'closed'
  }
  
  private onFailure() {
    this.failures++
    this.lastFailureTime = Date.now()
    
    if (this.failures >= this.threshold) {
      this.state = 'open'
      
      sendSlackAlert('warning', 'Circuit breaker opened', {
        failures: this.failures,
        timeout: `${this.timeout / 1000}s`
      })
    }
  }
}
```

### Automatic Cache Invalidation

```typescript
// src/lib/smart-cache.ts
export class SmartCache {
  private cache = new Map<string, { value: any; timestamp: number }>()
  
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = 300000
  ): Promise<T> {
    const cached = this.cache.get(key)
    
    // Return cached value if fresh
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value
    }
    
    // Fetch fresh data
    try {
      const value = await fetcher()
      this.cache.set(key, { value, timestamp: Date.now() })
      return value
    } catch (error) {
      // Return stale cache on error if available
      if (cached) {
        log('warn', `Using stale cache for ${key}`)
        return cached.value
      }
      throw error
    }
  }
  
  invalidate(pattern: string) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    }
  }
}
```

## Metrics Dashboard

### Key Metrics to Track

**Application Metrics**:
- Request rate (RPM)
- Response time (p50, p95, p99)
- Error rate
- Active users
- Cache hit rate

**Business Metrics**:
- Profiles claimed
- Wallets connected
- Social timelines viewed
- DAO memberships tracked
- NFTs displayed

**Infrastructure Metrics**:
- CPU usage
- Memory usage
- Network bandwidth
- API quota usage
- Database connections

### Vercel Analytics

Already integrated via `@vercel/analytics` and `@vercel/speed-insights`:

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## Incident Response

### Incident Severity Levels

**P0 - Critical**:
- Application completely down
- Data breach or security incident
- Response time: Immediate

**P1 - High**:
- Major feature broken
- API error rate > 10%
- Response time: Within 1 hour

**P2 - Medium**:
- Minor feature degradation
- Performance issues
- Response time: Within 4 hours

**P3 - Low**:
- Cosmetic issues
- Nice-to-have improvements
- Response time: Next sprint

### Incident Response Workflow

1. **Detection**: Automated monitoring alerts team
2. **Triage**: Assess severity and impact
3. **Response**: Implement fix or workaround
4. **Communication**: Update status page and notify users
5. **Resolution**: Deploy fix to production
6. **Post-mortem**: Document incident and preventive measures

## Continuous Improvement

### Performance Optimization

Automated suggestions based on metrics:
- Slow API endpoints → Add caching
- High memory usage → Implement pagination
- Low cache hit rate → Adjust TTL values
- High error rate → Add retry logic

### Auto-Scaling

Vercel handles auto-scaling automatically:
- Serverless functions scale to zero
- Edge functions deploy globally
- Automatic load balancing

For self-hosted deployments:
- Monitor CPU/memory usage
- Scale horizontally when > 70% capacity
- Alert team when scaling occurs

## Resources

- **Sentry Dashboard**: https://sentry.io/organizations/efp
- **Vercel Analytics**: https://vercel.com/analytics
- **Status Page**: https://status.efp.app (to be implemented)
- **Grafana Dashboards**: (for self-hosted deployments)
