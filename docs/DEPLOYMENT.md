# Deployment Guide

## Overview

This document provides comprehensive instructions for deploying the Social Portfolio Platform to production.

## Prerequisites

- GitHub account with repository access
- Vercel account (recommended) or alternative hosting platform
- Domain name (optional, Vercel provides free domains)
- Environment variables configured

## Environment Variables

### Required Variables

Create a `.env` file based on `.env.example`:

```bash
# Application
NEXT_PUBLIC_APP_URL=https://efp.app
NODE_ENV=production

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Blockchain APIs
ALCHEMY_API_KEY=your_alchemy_key
HELIUS_API_KEY=your_helius_key

# Social Platform APIs
FARCASTER_API_KEY=your_farcaster_key
LENS_API_KEY=your_lens_key
ZORA_API_KEY=your_zora_key

# DAO APIs
SNAPSHOT_API_KEY=your_snapshot_key
TALLY_API_KEY=your_tally_key

# Monitoring
SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=your_ga_id
VERCEL_ANALYTICS_ID=your_vercel_analytics_id

# Database (if using)
DATABASE_URL=your_database_url

# Redis (for caching)
REDIS_URL=your_redis_url

# Search Engine APIs
GOOGLE_SEARCH_CONSOLE_KEY=your_google_key
BING_WEBMASTER_KEY=your_bing_key
```

### Optional Variables

```bash
# Rate Limiting
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password

# CDN
CDN_URL=your_cdn_url

# Feature Flags
ENABLE_SOLANA=true
ENABLE_DAO_ANALYTICS=true
ENABLE_SEO_PING=true
```

## Deployment Methods

### Method 1: Vercel (Recommended)

#### Initial Setup

1. **Connect Repository**:
   ```bash
   # Visit https://vercel.com/new
   # Import your GitHub repository
   # Or use Vercel CLI:
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Configure Project**:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `bun run build`
   - Output Directory: `.next`
   - Install Command: `bun install`

3. **Add Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add all variables from your `.env` file
   - Or use CLI:
   ```bash
   vercel env add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
   vercel env add ALCHEMY_API_KEY
   # ... add all other variables
   ```

4. **Deploy**:
   ```bash
   vercel --prod
   ```

#### Auto-Deploy from GitHub

Vercel automatically deploys when you push to `main`:
- Preview deployments for PRs
- Production deployments for `main` branch

Configure in `vercel.json`:
```json
{
  "buildCommand": "bun run build",
  "devCommand": "bun dev",
  "installCommand": "bun install",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1"],
  "env": {
    "NODE_OPTIONS": "--no-warnings"
  }
}
```

### Method 2: Self-Hosted (Docker)

#### Dockerfile

```dockerfile
FROM oven/bun:1 AS base

WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN bun run build

# Expose port
EXPOSE 3000

# Start
CMD ["bun", "start"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    env_file:
      - .env
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
```

#### Deploy

```bash
# Build image
docker build -t social-portfolio .

# Run container
docker run -p 3000:3000 --env-file .env social-portfolio

# Or use docker-compose
docker-compose up -d
```

### Method 3: AWS (Advanced)

#### Using AWS Amplify

1. **Connect Repository**:
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Select branch (main)

2. **Build Settings** (`amplify.yml`):
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - curl -fsSL https://bun.sh/install | bash
        - export PATH="$HOME/.bun/bin:$PATH"
        - bun install
    build:
      commands:
        - bun run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

3. **Add Environment Variables** in Amplify Console

4. **Deploy**:
   - Amplify auto-deploys on push to main

#### Using EC2 + Nginx

1. **Launch EC2 Instance**:
   ```bash
   # Ubuntu 22.04 LTS
   # t3.medium or larger recommended
   ```

2. **Install Dependencies**:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install Bun
   curl -fsSL https://bun.sh/install | bash

   # Install Nginx
   sudo apt install -y nginx

   # Install PM2
   npm install -g pm2
   ```

3. **Clone and Build**:
   ```bash
   git clone https://github.com/SMSDAO/app.git
   cd app
   bun install
   bun run build
   ```

4. **Configure PM2**:
   ```bash
   # Start app
   pm2 start "bun start" --name social-portfolio

   # Save PM2 config
   pm2 save

   # Setup PM2 to start on boot
   pm2 startup
   ```

5. **Configure Nginx** (`/etc/nginx/sites-available/social-portfolio`):
   ```nginx
   server {
       listen 80;
       server_name efp.app www.efp.app;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable Site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/social-portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **SSL with Let's Encrypt**:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d efp.app -d www.efp.app
   ```

## Database Setup

### PostgreSQL (if needed)

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Create database
sudo -u postgres psql
CREATE DATABASE social_portfolio;
CREATE USER portfolio_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE social_portfolio TO portfolio_user;
\q

# Run migrations
bun run db:migrate
```

### Redis Setup

```bash
# Install Redis
sudo apt install -y redis-server

# Configure Redis
sudo nano /etc/redis/redis.conf
# Set: supervised systemd
# Set: maxmemory 256mb
# Set: maxmemory-policy allkeys-lru

# Restart Redis
sudo systemctl restart redis
```

## CDN Configuration

### Cloudflare CDN

1. **Add Site to Cloudflare**:
   - Go to Cloudflare Dashboard
   - Add your domain
   - Update nameservers

2. **Configure Caching**:
   - Go to Caching > Configuration
   - Enable "Cache Everything" for static assets
   - Set TTL: 4 hours

3. **Page Rules**:
   ```
   Rule 1: /*
   Cache Level: Standard
   Browser Cache TTL: 4 hours
   
   Rule 2: /api/*
   Cache Level: Bypass
   
   Rule 3: /_next/static/*
   Cache Level: Cache Everything
   Edge Cache TTL: 1 month
   ```

4. **SSL/TLS**:
   - Set SSL mode to "Full (strict)"
   - Enable "Always Use HTTPS"

## Monitoring Setup

### Sentry

```bash
# Sentry is already integrated
# Add your DSN to environment variables
SENTRY_DSN=your_sentry_dsn

# Optional: Upload source maps
npx @sentry/cli releases new $RELEASE_VERSION
npx @sentry/cli releases files $RELEASE_VERSION upload-sourcemaps .next
npx @sentry/cli releases finalize $RELEASE_VERSION
```

### Uptime Monitoring

```bash
# Use external services:
# - UptimeRobot (free)
# - Pingdom
# - Datadog
# - New Relic

# Monitor endpoints:
# - https://efp.app
# - https://efp.app/api/health
# - https://efp.app/api/status
```

### Log Management

```bash
# Install Logtail (recommended)
npm install @logtail/node

# Or use PM2 logs
pm2 logs social-portfolio

# Or use systemd journal
journalctl -u social-portfolio -f
```

## CI/CD Configuration

GitHub Actions automatically handles CI/CD. See [WORKFLOWS.md](./WORKFLOWS.md) for details.

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test wallet connection functionality
- [ ] Verify API integrations work (Alchemy, Helius, etc.)
- [ ] Check social platform integrations (Farcaster, Lens, Zora)
- [ ] Test profile claiming
- [ ] Verify SEO meta tags
- [ ] Submit sitemap to search engines
- [ ] Set up monitoring alerts
- [ ] Configure SSL certificates
- [ ] Enable CDN caching
- [ ] Test on multiple devices and browsers
- [ ] Run performance audit (Lighthouse)
- [ ] Verify error tracking (Sentry)
- [ ] Test rate limiting
- [ ] Backup database (if applicable)

## Performance Optimization

### Next.js Configuration

```javascript
// next.config.mjs
export default {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['efp.app', 'alchemy.com', 'helius.xyz'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize bundle
  swcMinify: true,
  
  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ]
  },
}
```

### Caching Strategy

```typescript
// Cache configuration
export const cacheConfig = {
  // API responses
  api: {
    tokens: 5 * 60 * 1000, // 5 minutes
    nfts: 15 * 60 * 1000, // 15 minutes
    social: 10 * 60 * 1000, // 10 minutes
    dao: 30 * 60 * 1000, // 30 minutes
  },
  
  // Static assets
  static: {
    images: 7 * 24 * 60 * 60 * 1000, // 7 days
    fonts: 365 * 24 * 60 * 60 * 1000, // 1 year
    scripts: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
}
```

## Scaling

### Horizontal Scaling

- Vercel automatically scales based on traffic
- For self-hosted: Use load balancer (Nginx, HAProxy)
- Deploy multiple instances behind load balancer

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize database queries
- Enable query caching
- Use read replicas for database

### Database Optimization

```sql
-- Add indexes for common queries
CREATE INDEX idx_profiles_address ON profiles(address);
CREATE INDEX idx_profiles_ens ON profiles(ens);
CREATE INDEX idx_activities_address ON activities(address);
CREATE INDEX idx_activities_timestamp ON activities(timestamp);
```

## Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Promote specific deployment to production
vercel promote [deployment-url]

# Or rollback via dashboard:
# 1. Go to Deployments
# 2. Find previous working deployment
# 3. Click "Promote to Production"
```

### Self-Hosted

```bash
# With PM2
pm2 reload social-portfolio

# With Git
git reset --hard <previous-commit>
bun install
bun run build
pm2 restart social-portfolio
```

## Troubleshooting

### Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules bun.lockb
bun install

# Rebuild
bun run build
```

### Runtime Errors

```bash
# Check logs
pm2 logs social-portfolio

# Check Sentry for errors
# Visit Sentry dashboard

# Check API health
curl https://efp.app/api/health
```

### Performance Issues

```bash
# Run Lighthouse audit
npm install -g @lhci/cli
lhci autorun --url=https://efp.app

# Check bundle size
npx next build --profile

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true bun run build
```

## Support

For deployment assistance:
- **Documentation**: [docs.efp.app](https://docs.efp.app)
- **Discord**: [Discord Support](https://discord.efp.app)
- **Email**: [encrypted@ethfollow.xyz](mailto:encrypted@ethfollow.xyz)
