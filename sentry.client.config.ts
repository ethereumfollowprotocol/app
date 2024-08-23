import * as Sentry from '@sentry/nextjs'

const filename = import.meta.url.split('/').pop()

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
if (!SENTRY_DSN) throw new Error(`SENTRY_DSN is not defined in ${filename}`)

Sentry.init({
  enabled: process.env.SENTRY_DISABLED !== 'true' && process.env.NODE_ENV === 'production',
  dsn: SENTRY_DSN,
  // tunnel: '/monitoring',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
  /**
   * Set profilesSampleRate to 1.0 to profile every transaction.
   * Since profilesSampleRate is relative to tracesSampleRate,
   * the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
   * For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
   * results in 25% of transactions being profiled (0.5*0.5=0.25'
   */
  profilesSampleRate: 1.0,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  // debug: false,
  replaysOnErrorSampleRate: 1.0,
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 1.0
  // tracePropagationTargets: ['localhost'],
  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
})
