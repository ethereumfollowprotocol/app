import * as Sentry from '@sentry/nextjs'

const filename = import.meta.url.split('/').pop()

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
if (!SENTRY_DSN) throw new Error(`SENTRY_DSN is not defined in ${filename}`)

Sentry.init({
  enabled: process.env.SENTRY_DISABLED !== 'true' && process.env.NODE_ENV === 'production',
  dsn: SENTRY_DSN,
  tunnel: '/monitoring',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  // debug: false,
  replaysOnErrorSampleRate: 1.0,
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  // tracePropagationTargets: ['localhost'],
  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [new Sentry.Replay()]
})
