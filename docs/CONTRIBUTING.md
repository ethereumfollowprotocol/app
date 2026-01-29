# Contributing to Social Portfolio Platform

Thank you for your interest in contributing to the Social Portfolio Platform! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v20.x LTS
- **Bun**: Latest version (`curl -fsSL https://bun.sh/install | bash`)
- **Git**: Latest version

### Development Setup

1. **Fork the Repository**:
   ```bash
   # Visit https://github.com/SMSDAO/app
   # Click the "Fork" button in the top right
   ```

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/app.git
   cd app
   ```

3. **Add Upstream Remote**:
   ```bash
   git remote add upstream https://github.com/SMSDAO/app.git
   ```

4. **Install Dependencies**:
   ```bash
   bun install
   ```

5. **Set Up Environment Variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

6. **Verify Setup**:
   ```bash
   bun lint        # Should pass with no errors
   bun typecheck   # Should pass with no errors
   bun run build   # Should build successfully
   ```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

Follow these guidelines when making changes:

#### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Formatting**: Run `bun format` before committing
- **Linting**: Run `bun lint` and fix all errors
- **Type Safety**: Avoid `any` types; use proper type definitions

#### Component Guidelines

```typescript
// ✅ Good: Properly typed component with JSDoc
/**
 * Profile card component displaying user information
 */
interface ProfileCardProps {
  /** User's wallet address */
  address: string
  /** Optional ENS name */
  ens?: string
  /** Avatar URL */
  avatar?: string
}

export function ProfileCard({ address, ens, avatar }: ProfileCardProps) {
  return (
    <div className="profile-card">
      {/* Component content */}
    </div>
  )
}

// ❌ Bad: Untyped component
export function ProfileCard(props: any) {
  return <div>{props.address}</div>
}
```

#### File Naming

- **Components**: PascalCase (`ProfileCard.tsx`)
- **Utilities**: camelCase (`formatAddress.ts`)
- **Types**: PascalCase (`types/Profile.ts`)
- **Hooks**: camelCase with `use` prefix (`useWallet.ts`)

#### Directory Structure

```
src/
├── api/              # API integration functions
├── app/              # Next.js app directory (routes)
├── components/       # React components
│   ├── ui/          # Generic UI components
│   ├── wallet/      # Wallet-related components
│   ├── social/      # Social feed components
│   └── dao/         # DAO components
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

### 3. Write Tests

We aim for 80%+ code coverage. Write tests for:

#### Unit Tests

```typescript
// src/utils/formatAddress.test.ts
import { describe, it, expect } from 'vitest'
import { formatAddress } from './formatAddress'

describe('formatAddress', () => {
  it('should format Ethereum address', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678'
    expect(formatAddress(address)).toBe('0x1234...5678')
  })
  
  it('should handle ENS names', () => {
    expect(formatAddress('vitalik.eth')).toBe('vitalik.eth')
  })
  
  it('should handle invalid input', () => {
    expect(formatAddress('')).toBe('')
    expect(formatAddress(null)).toBe('')
  })
})
```

#### Integration Tests

```typescript
// src/api/wallet/tokens.test.ts
import { describe, it, expect, beforeAll } from 'vitest'
import { fetchTokens } from './tokens'

describe('fetchTokens', () => {
  beforeAll(() => {
    // Setup test environment
  })
  
  it('should fetch tokens for valid address', async () => {
    const tokens = await fetchTokens('0x...')
    expect(tokens).toHaveLength(3)
    expect(tokens[0]).toHaveProperty('symbol')
    expect(tokens[0]).toHaveProperty('balance')
  })
})
```

### 4. Commit Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Format: <type>(<scope>): <subject>

# Types:
# - feat: New feature
# - fix: Bug fix
# - docs: Documentation changes
# - style: Code style changes (formatting, etc.)
# - refactor: Code refactoring
# - test: Adding or updating tests
# - chore: Maintenance tasks

# Examples:
git commit -m "feat(wallet): add Solana wallet support"
git commit -m "fix(nft): resolve image loading issue"
git commit -m "docs(api): update API documentation"
git commit -m "test(social): add Farcaster integration tests"
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create PR via GitHub UI
# Visit: https://github.com/YOUR_USERNAME/app/pull/new/feature/your-feature-name
```

## Pull Request Guidelines

### PR Title

Use the same format as commit messages:
```
feat(wallet): add Solana wallet support
fix(nft): resolve image loading issue
```

### PR Description Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Testing
Describe the tests you ran and their results.

## Screenshots (if applicable)
Add screenshots for UI changes.

## Related Issues
Closes #123
```

### PR Review Process

1. **Automated Checks**: CI/CD runs automatically
   - Linting
   - Type checking
   - Tests
   - Build verification

2. **Code Review**: Maintainers review your code
   - Code quality
   - Test coverage
   - Documentation
   - Performance impact

3. **Feedback**: Address review comments
   - Make requested changes
   - Push additional commits
   - Re-request review

4. **Merge**: Once approved, PR is merged
   - Squash and merge strategy
   - Auto-deploy to production

## Development Guidelines

### Performance Best Practices

1. **Use Server Components**: Default to Server Components when possible
   ```typescript
   // ✅ Server Component (default)
   export default async function ProfilePage({ params }: { params: { address: string } }) {
     const profile = await fetchProfile(params.address)
     return <ProfileView profile={profile} />
   }
   ```

2. **Optimize Images**: Use Next.js Image component
   ```typescript
   import Image from 'next/image'
   
   <Image
     src={avatar}
     alt="Avatar"
     width={100}
     height={100}
     priority={false}
   />
   ```

3. **Code Splitting**: Use dynamic imports for heavy components
   ```typescript
   const Chart = dynamic(() => import('./Chart'), {
     loading: () => <Skeleton />,
     ssr: false,
   })
   ```

### Security Best Practices

1. **Validate Input**: Always validate user input
   ```typescript
   import { isAddress } from 'viem'
   
   if (!isAddress(address)) {
     throw new Error('Invalid address')
   }
   ```

2. **Sanitize Data**: Sanitize data before rendering
   ```typescript
   import DOMPurify from 'isomorphic-dompurify'
   
   const cleanHTML = DOMPurify.sanitize(userInput)
   ```

3. **Environment Variables**: Never commit secrets
   ```typescript
   // ❌ Bad
   const apiKey = 'abc123'
   
   // ✅ Good
   const apiKey = process.env.API_KEY
   ```

### Accessibility Guidelines

1. **Semantic HTML**: Use proper HTML elements
   ```typescript
   // ✅ Good
   <button onClick={handleClick}>Click me</button>
   
   // ❌ Bad
   <div onClick={handleClick}>Click me</div>
   ```

2. **ARIA Labels**: Add labels for screen readers
   ```typescript
   <button aria-label="Connect wallet">
     <WalletIcon />
   </button>
   ```

3. **Keyboard Navigation**: Support keyboard interactions
   ```typescript
   <div
     role="button"
     tabIndex={0}
     onKeyDown={(e) => e.key === 'Enter' && handleClick()}
   >
     Action
   </div>
   ```

## Testing Guidelines

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage

# Run specific test file
bun test src/utils/formatAddress.test.ts
```

### Writing Tests

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('Component or Function', () => {
  beforeEach(() => {
    // Setup before each test
  })
  
  afterEach(() => {
    // Cleanup after each test
  })
  
  it('should do something', () => {
    // Test implementation
    expect(result).toBe(expected)
  })
  
  it('should handle edge case', () => {
    // Edge case test
  })
})
```

## Documentation Guidelines

### Code Documentation

Use JSDoc comments for functions and components:

```typescript
/**
 * Formats a wallet address for display
 * @param address - The full wallet address
 * @param short - Whether to use short format (default: true)
 * @returns Formatted address string
 * @example
 * formatAddress('0x1234...') // '0x1234...5678'
 */
export function formatAddress(address: string, short = true): string {
  // Implementation
}
```

### Documentation Files

Update relevant documentation when making changes:
- **README.md**: Update if changing installation or usage
- **docs/API.md**: Update if changing API endpoints
- **docs/FEATURES.md**: Update if adding/modifying features
- **docs/ARCHITECTURE.md**: Update if changing architecture

## Common Issues and Solutions

### Issue: Bun install fails

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
```

### Issue: Type errors in IDE but not in terminal

**Solution**:
```bash
# Restart TypeScript server in VS Code
# Press: Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
# Type: "TypeScript: Restart TS Server"
```

### Issue: Build fails with module not found

**Solution**:
```bash
# Check import paths
# Use absolute imports with @ prefix
import { Button } from '@/components/ui/button'
```

## Communication

### Discord

Join our Discord server for:
- General discussion
- Questions and help
- Feature suggestions
- Real-time collaboration

**Link**: [Discord](https://discord.efp.app)

### GitHub Discussions

Use GitHub Discussions for:
- Feature requests
- Architecture discussions
- Best practices
- Community proposals

### GitHub Issues

Create issues for:
- Bug reports
- Feature requests
- Documentation improvements

**Bug Report Template**:
```markdown
**Describe the bug**
Clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 20.10.0]
```

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Community highlights

Top contributors may be invited to join the core team.

## Questions?

If you have questions not covered in this guide:
- Check existing documentation
- Search GitHub Issues and Discussions
- Ask in Discord
- Email: [encrypted@ethfollow.xyz](mailto:encrypted@ethfollow.xyz)

Thank you for contributing to the Social Portfolio Platform! 🚀
