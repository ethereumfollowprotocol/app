/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig & any) => NextConfig)>} NextConfigPlugins
 * @typedef {import('webpack').Configuration} WebpackConfiguration
 * @typedef {import('@sentry/nextjs/types/config/types.ts').UserSentryOptions} SentryUserOptions
 * @typedef {import('@sentry/nextjs').SentryWebpackPluginOptions} SentryWebpackPluginOptions
 */
import million from 'million/compiler'
import childProcess from 'node:child_process'
import { withSentryConfig } from '@sentry/nextjs'

/** @type {NextConfigPlugins} */
const plugins = []

if (process.env['ANALYZE']) {
  const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer({ enabled: true }))
}

// curl https://api.github.com/repos/ethereumfollowprotocol/app/commits/develop | jq --raw-output '.sha'
const APP_VERSION = childProcess
  .execSync('git rev-parse --short HEAD || echo "no-git"')
  .toString()
  .trim()

console.info(`\nBuilding with app version: ${APP_VERSION}\n`)

/** @type {NextConfig} */
const nextConfig = {
  cleanDistDir: true,
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
    APP_VERSION: process.env['VERCEL_GIT_COMMIT_SHA'] || APP_VERSION,
    APP_VERSION_SHORT: (process.env['VERCEL_GIT_COMMIT_SHA'] || APP_VERSION).slice(0, 7)
  },
  images: {
    remotePatterns: [
      /**
       * Temporarily accept all domains during development
       */
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  },
  /** @param {WebpackConfiguration} config */
  webpack: (config, context) => {
    if (config.name === 'server' && config.optimization) {
      config.optimization.concatenateModules = false
    }
    /* WalletConnect x wagmi needed configuration */
    if (config.resolve) config.resolve.fallback = { fs: false, net: false, tls: false }
    if (Array.isArray(config.externals)) {
      config.externals.push('lokijs', 'pino', 'pino-pretty', 'encoding')
    }
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino|pino-pretty|encoding)$/
        }),
        new context.webpack.NormalModuleReplacementPlugin(
          /node:/,
          (/** @type {{ request: string; }} */ resource) => {
            resource.request = resource.request.replace(/^node:/, '')
          }
        )
      )
    }
    return config
  },
  redirects: async () => [
    {
      source: '/(twitter|x)',
      destination: 'https://x.com/ethfollowpr',
      permanent: true
    },
    {
      source: '/github',
      destination: 'https://github.com/ethereumfollowprotocol',
      permanent: true
    },
    {
      source: '/(docs|documentation)',
      destination: 'https://docs.ethfollow.xyz',
      permanent: true
    },
    {
      source: '/(chat|discord)',
      destination: 'https://discord.ethfollow.xyz',
      permanent: true
    }
  ],
  /** @link https://nextjs.org/docs/app/api-reference/next-config-js/headers#options */
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'efp-build-version',
          value: (process.env['VERCEL_GIT_COMMIT_SHA'] || APP_VERSION).slice(0, 7)
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self' vercel.live;",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com;",
            "style-src 'self' 'unsafe-inline' *.vercel-storage.com fonts.googleapis.com;",
            'img-src * blob: data: *.vercel-storage.com;',
            "media-src 'none';",
            'connect-src *;',
            "font-src 'self' *.public.blob.vercel-storage.com *.vercel-storage.com fonts.googleapis.com fonts.gstatic.com;",
            "frame-ancestors 'self';"
          ].join(' ')
        },
        {
          key: 'Feature-Policy',
          value: "geolocation 'none'; microphone 'none'; camera 'none';"
        },
        {
          key: 'Permissions-Policy',
          value: 'browsing-topics=()'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        }
      ]
    }
  ],
  /**
   * @link https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup
   * @type {SentryUserOptions}
   */
  sentry: {
    // Hides source maps from generated client bundles. Default is false
    hideSourceMaps: true,
    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
    autoInstrumentMiddleware: true,
    autoInstrumentServerFunctions: true
  }
}

// https://github.com/getsentry/sentry-webpack-plugin#options
const nextConfigWithSentry = withSentryConfig(nextConfig, {
  authToken: process.env['SENTRY_AUTH_TOKEN'],
  org: 'efp',
  project: 'web',
  silent: process.env['NODE_ENV'] !== 'development'
})

const nextConfigWithPlugins = () => plugins.reduce((_, plugin) => plugin(_), nextConfigWithSentry)

export default process.env.NODE_ENV === 'development'
  ? nextConfigWithPlugins()
  : million.next(nextConfigWithPlugins, { auto: { rsc: true } })
