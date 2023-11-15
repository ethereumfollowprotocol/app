import * as Sentry from '@sentry/nextjs'

const filename = import.meta.url.split('/').pop()

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
if (!SENTRY_DSN) throw new Error(`NEXT_PUBLIC_SENTRY_DSN is not defined in ${filename}`)

Sentry.init({
  enabled: process.env.SENTRY_DISABLED !== 'true',
  dsn: SENTRY_DSN,
  integrations: [new Sentry.Replay()],
  /**
   * Set tracesSampleRate to 1.0 to capture 100%
   * of transactions for performance monitoring.
   * We recommend adjusting this value in production
   */
  tracesSampleRate: 1.0,
  /**
   * Capture Replay for 10% of all sessions,
   * plus for 100% of sessions with an error
   */
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
  /**
   * Note: if you want to override the automatic release value,
   * do not set a `release` value here - use the environment variable `SENTRY_RELEASE`,
   * so that it will also get attached to your source maps
   */
})
