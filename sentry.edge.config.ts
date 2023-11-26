import * as Sentry from '@sentry/nextjs'

const filename = import.meta.url.split('/').pop()

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
if (!SENTRY_DSN) throw new Error(`SENTRY_DSN is not defined in ${filename}`)

Sentry.init({
  enabled: process.env.SENTRY_DISABLED !== 'true' && process.env.NODE_ENV === 'production',
  dsn: SENTRY_DSN,
  tunnel: '/monitoring',
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  /**
   * Set tracesSampleRate to 1.0 to capture 100%
   * of transactions for performance monitoring.
   * We recommend adjusting this value in production
   */
  tracesSampleRate: 1.0
  /**
   * Note: if you want to override the automatic release value,
   * do not set a `release` value here - use the environment variable `SENTRY_RELEASE`,
   * so that it will also get attached to your source maps
   */
})
