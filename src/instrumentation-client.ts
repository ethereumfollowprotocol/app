import posthog from 'posthog-js'

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_wXHXwgojPaFZw3RgzJV3v9TJBFaJZ2L6SjPqwivRZ4wD'
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://hedge.ethid.org'

posthog.init(key, {
  api_host: host,
  capture_pageview: false,
  capture_pageleave: true,
  person_profiles: 'identified_only',
})
