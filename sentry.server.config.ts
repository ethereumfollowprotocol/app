// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  enabled: process.env.SENTRY_DISABLED !== 'true' && process.env.NODE_ENV === 'production',
  dsn: 'https://5dd8cb3103f0e840a3bd3e193d6408e9@o4506127860236288.ingest.us.sentry.io/4506127864037376',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
})
