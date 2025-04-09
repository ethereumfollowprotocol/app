/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig & any) => NextConfig)>} NextConfigPlugins
 */

import childProcess from 'node:child_process'
import { withSentryConfig } from '@sentry/nextjs'

const APP_VERSION =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  childProcess.execSync('git rev-parse --short HEAD || echo "no-git"').toString().trim()

console.info(`\nBuilding with app version: ${APP_VERSION}\n`)

/** @type {NextConfig} */
const nextConfig = {
  cleanDistDir: true,
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  generateBuildId: async () => APP_VERSION,
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    APP_VERSION,
    APP_VERSION_SHORT: APP_VERSION?.slice(0, 7),
  },
  logging: {
    fetches: { fullUrl: true },
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/service-worker.js',
          destination: '/scripts/service-worker.js',
        },
      ],
    }
  },
  redirects: async () => [
    {
      source: '/(twitter|x)',
      destination: 'https://x.com/efp',
      permanent: true,
    },
    {
      source: '/github',
      destination: 'https://github.com/ethereumfollowprotocol',
      permanent: true,
    },
    {
      source: '/(docs|documentation)',
      destination: 'https://docs.efp.app/intro',
      permanent: true,
    },
    {
      source: '/(chat|discord)',
      destination: 'https://discord.com/invite/ZUyG3mSXFD',
      permanent: true,
    },
  ],
  /** @link https://nextjs.org/docs/app/api-reference/next-config-js/headers#options */
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-EFP-App-Version',
          value: APP_VERSION,
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Feature-Policy',
          value: "geolocation 'none'; microphone 'none'; camera 'none';",
        },
        {
          key: 'Permissions-Policy',
          value: 'browsing-topics=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
    {
      source: '/service-worker.js',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/javascript; charset=utf-8',
        },
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate',
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self'",
        },
      ],
    },
  ],
  webpack(config) {
    // @ts-expect-error rule type is not typed
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

// https://github.com/getsentry/sentry-webpack-plugin#options
const nextConfigWithSentry = withSentryConfig(nextConfig, {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: 'efp',
  project: 'web',
  // hideSourceMaps: true,
  // silent: process.env['NODE_ENV'] !== 'development'
})

export default nextConfigWithSentry
