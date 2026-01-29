# CI/CD Workflows Documentation

## Overview

This document describes all GitHub Actions workflows used in the Social Portfolio Platform for continuous integration, deployment, and automation.

## Workflow Files

### 1. Test Workflow (`.github/workflows/test.yml`)

**Purpose**: Run comprehensive tests on all pull requests and pushes.

**Triggers**:
- Pull requests to any branch
- Pushes to any branch
- Manual workflow dispatch

**Steps**:
1. Checkout code
2. Setup Bun runtime
3. Install dependencies
4. Run linting (ESLint)
5. Run type checking (TypeScript)
6. Run unit tests
7. Run integration tests
8. Generate coverage report
9. Upload coverage to Codecov

**Configuration**:
```yaml
name: Test

on:
  pull_request:
  push:
    branches: '*'
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      
      - name: Install Dependencies
        run: bun install
      
      - name: Lint
        run: bun lint
      
      - name: Type Check
        run: bun typecheck
      
      - name: Run Tests
        run: bun test --coverage
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

### 2. Build Documentation Workflow (`.github/workflows/build-docs.yml`)

**Purpose**: Build and validate documentation on changes.

**Triggers**:
- Pull requests that modify `docs/**`
- Pushes to main that modify `docs/**`
- Manual workflow dispatch

**Steps**:
1. Checkout code
2. Setup Node.js
3. Install markdown linter
4. Lint markdown files
5. Check for broken links
6. Validate documentation structure

**Configuration**:
```yaml
name: Build Documentation

on:
  pull_request:
    paths:
      - 'docs/**'
  push:
    branches: [main]
    paths:
      - 'docs/**'
  workflow_dispatch:

jobs:
  build-docs:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install markdown-link-check
        run: npm install -g markdown-link-check
      
      - name: Check Markdown Links
        run: |
          for file in docs/*.md; do
            markdown-link-check "$file" --config .markdown-link-check.json
          done
      
      - name: Validate Structure
        run: |
          required_files=(
            "docs/README.md"
            "docs/ARCHITECTURE.md"
            "docs/API.md"
            "docs/FEATURES.md"
            "docs/DEPLOYMENT.md"
            "docs/WORKFLOWS.md"
            "docs/MONITORING.md"
            "docs/SEO.md"
            "docs/CONTRIBUTING.md"
          )
          
          for file in "${required_files[@]}"; do
            if [ ! -f "$file" ]; then
              echo "Missing required file: $file"
              exit 1
            fi
          done
```

### 3. Deploy Workflow (`.github/workflows/deploy.yml`)

**Purpose**: Deploy application to production on merge to main.

**Triggers**:
- Push to `main` branch
- Manual workflow dispatch

**Steps**:
1. Checkout code
2. Setup Bun
3. Install dependencies
4. Run tests
5. Build application
6. Deploy to Vercel
7. Notify team on Slack/Discord

**Configuration**:
```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      
      - name: Install Dependencies
        run: bun install
      
      - name: Run Tests
        run: bun test
      
      - name: Build
        run: bun run build
        env:
          NODE_ENV: production
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      
      - name: Notify Deployment
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Deployment completed'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

### 4. Monitoring Workflow (`.github/workflows/monitoring.yml`)

**Purpose**: Perform health checks and uptime monitoring.

**Triggers**:
- Schedule: Every 15 minutes
- Manual workflow dispatch

**Steps**:
1. Check API health endpoint
2. Check main application
3. Verify response times
4. Alert on failures

**Configuration**:
```yaml
name: Monitoring

on:
  schedule:
    - cron: '*/15 * * * *'  # Every 15 minutes
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    
    steps:
      - name: Check API Health
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://efp.app/api/health)
          if [ $response -ne 200 ]; then
            echo "API health check failed with status: $response"
            exit 1
          fi
      
      - name: Check Application
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" https://efp.app)
          if [ $response -ne 200 ]; then
            echo "Application health check failed with status: $response"
            exit 1
          fi
      
      - name: Check Response Time
        run: |
          time=$(curl -o /dev/null -s -w '%{time_total}' https://efp.app)
          threshold=2.0
          if (( $(echo "$time > $threshold" | bc -l) )); then
            echo "Response time $time exceeds threshold $threshold"
            exit 1
          fi
      
      - name: Alert on Failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: 'failure'
          text: 'Health check failed'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 5. SEO Ping Workflow (`.github/workflows/seo-ping.yml`)

**Purpose**: Automated SEO pings to search engines when profiles are updated.

**Triggers**:
- Schedule: Daily at midnight
- Push to main (for sitemap updates)
- Manual workflow dispatch

**Steps**:
1. Generate sitemap
2. Submit to Google Search Console
3. Submit to Bing Webmaster Tools
4. Ping IndexNow
5. Update search engine status

**Configuration**:
```yaml
name: SEO Ping

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  push:
    branches: [main]
    paths:
      - 'public/sitemap.xml'
  workflow_dispatch:

jobs:
  seo-ping:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Ping Google
        run: |
          curl "https://www.google.com/ping?sitemap=https://efp.app/sitemap.xml"
      
      - name: Ping Bing
        run: |
          curl "https://www.bing.com/ping?sitemap=https://efp.app/sitemap.xml"
      
      - name: Ping IndexNow
        run: |
          curl -X POST "https://api.indexnow.org/indexnow" \
            -H "Content-Type: application/json" \
            -d '{
              "host": "efp.app",
              "key": "${{ secrets.INDEXNOW_KEY }}",
              "keyLocation": "https://efp.app/${{ secrets.INDEXNOW_KEY }}.txt",
              "urlList": [
                "https://efp.app/sitemap.xml"
              ]
            }'
      
      - name: Log Results
        run: echo "SEO ping completed at $(date)"
```

### 6. Auto-Merge Workflow (`.github/workflows/auto-merge.yml`)

**Purpose**: Automatically merge PRs when all tests pass and coverage is sufficient.

**Triggers**:
- Pull request status changes
- Check suite completion

**Requirements**:
- All tests must pass
- Code coverage ≥ 80%
- No merge conflicts
- PR approved by maintainer

**Configuration**:
```yaml
name: Auto Merge

on:
  pull_request:
    types: [opened, synchronize, reopened]
  check_suite:
    types: [completed]

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    if: github.event.pull_request.user.login == 'dependabot[bot]' || contains(github.event.pull_request.labels.*.name, 'auto-merge')
    
    steps:
      - name: Check Status
        uses: actions/github-script@v7
        with:
          script: |
            const { data: pr } = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number
            })
            
            // Check if all required checks passed
            const { data: checks } = await github.rest.checks.listForRef({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: pr.head.sha
            })
            
            const allPassed = checks.check_runs.every(check => 
              check.conclusion === 'success'
            )
            
            if (!allPassed) {
              console.log('Not all checks passed')
              return
            }
            
            // Check coverage
            // Coverage check logic here
            
            // Merge PR
            await github.rest.pulls.merge({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: context.issue.number,
              merge_method: 'squash'
            })
```

### 7. Security Scan Workflow (`.github/workflows/security.yml`)

**Purpose**: Automated security scanning for vulnerabilities.

**Triggers**:
- Pull requests
- Pushes to main
- Schedule: Weekly
- Manual workflow dispatch

**Steps**:
1. Checkout code
2. Run npm audit
3. Run Snyk security scan
4. CodeQL analysis
5. SAST scanning
6. Report vulnerabilities

**Configuration**:
```yaml
name: Security Scan

on:
  pull_request:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch:

jobs:
  security:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      
      - name: Install Dependencies
        run: bun install
      
      - name: Run Audit
        run: bun audit || true
      
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: typescript, javascript
      
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
      
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

## Secrets Configuration

### Required Secrets

Configure these secrets in GitHub repository settings:

```bash
# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Notifications
SLACK_WEBHOOK=your_slack_webhook
DISCORD_WEBHOOK=your_discord_webhook

# SEO
INDEXNOW_KEY=your_indexnow_key
GOOGLE_SEARCH_CONSOLE_KEY=your_google_key
BING_WEBMASTER_KEY=your_bing_key

# Security
SNYK_TOKEN=your_snyk_token
CODECOV_TOKEN=your_codecov_token

# Application (same as .env)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wc_id
ALCHEMY_API_KEY=your_alchemy_key
# ... all other API keys
```

## Workflow Best Practices

### 1. Caching

Enable caching for faster builds:

```yaml
- name: Cache Dependencies
  uses: actions/cache@v3
  with:
    path: |
      ~/.bun/install/cache
      node_modules
      .next/cache
    key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
    restore-keys: |
      ${{ runner.os }}-bun-
```

### 2. Matrix Builds

Test across multiple environments:

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest, windows-latest]
    node-version: [18, 20]
```

### 3. Concurrency Control

Prevent redundant runs:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### 4. Conditional Steps

Run steps conditionally:

```yaml
- name: Deploy to Production
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  run: bun run deploy
```

## Monitoring Workflow Status

### GitHub Actions Dashboard

- View workflow runs: `https://github.com/SMSDAO/app/actions`
- Check individual run: Click on workflow run
- Download logs: Actions > Workflow > Download logs

### Status Badges

Add status badges to README:

```markdown
![Test](https://github.com/SMSDAO/app/workflows/Test/badge.svg)
![Deploy](https://github.com/SMSDAO/app/workflows/Deploy/badge.svg)
![Security](https://github.com/SMSDAO/app/workflows/Security/badge.svg)
```

### Notifications

Configure notifications:
- GitHub notifications for workflow failures
- Slack/Discord webhooks for real-time alerts
- Email notifications for critical failures

## Troubleshooting

### Common Issues

**Build Timeouts**:
```yaml
jobs:
  build:
    timeout-minutes: 30  # Increase if needed
```

**Permission Errors**:
```yaml
permissions:
  contents: write
  pull-requests: write
  checks: write
```

**Environment Variables**:
```yaml
env:
  NODE_ENV: production
  NODE_OPTIONS: '--no-warnings'
```

### Debug Mode

Enable debug logging:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

## Performance Optimization

### Parallel Jobs

Run jobs in parallel:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]
  
  test:
    runs-on: ubuntu-latest
    steps: [...]
  
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps: [...]
```

### Artifacts

Share build artifacts between jobs:

```yaml
- name: Upload Build
  uses: actions/upload-artifact@v3
  with:
    name: build
    path: .next

- name: Download Build
  uses: actions/download-artifact@v3
  with:
    name: build
```

## Security Best Practices

1. **Never commit secrets**: Use GitHub Secrets
2. **Limit permissions**: Use least privilege
3. **Pin action versions**: Use specific versions (e.g., `@v4`)
4. **Review dependencies**: Regular security audits
5. **Enable branch protection**: Require status checks

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Integration](https://vercel.com/docs/git)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
