/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig & any) => NextConfig)>} NextConfigPlugins
 * @typedef {import('webpack').Configuration} WebpackConfiguration
 * @typedef {import('@sentry/nextjs/types/config/types.ts').UserSentryOptions} SentryUserOptions
 * @typedef {import('@sentry/nextjs').SentryWebpackPluginOptions} SentryWebpackPluginOptions
 */

import webpack from 'webpack'
import million from 'million/compiler'
import { withSentryConfig } from '@sentry/nextjs'

/** @type {NextConfigPlugins} */
const plugins = []

if (process.env['ANALYZE']) {
  const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer({ enabled: true }))
}

/** @type {NextConfig} */
const nextConfig = {
  swcMinify: true,
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_TELEMETRY_DISABLED: '1'
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
  /** @param {WebpackConfiguration} config */
  webpack: config => {
    if (config.name === 'server' && config.optimization) {
      config.optimization.concatenateModules = false
    }
    if (config.resolve) {
      /* WalletConnect x wagmi needed configuration */
      config.resolve.fallback = { fs: false, net: false, tls: false }
    }
    if (Array.isArray(config.externals)) {
      config.externals.push('lokijs', 'pino', 'pino-pretty', 'encoding')
    }
    if (config.plugins) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino|pino-pretty|encoding)$/
        }),
        new webpack.NormalModuleReplacementPlugin(/node:/, resource => {
          resource.request = resource.request.replace(/^node:/, '')
        })
      )
    }
    return config
  },
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
  // TODO: add headers for security
}

// https://github.com/getsentry/sentry-webpack-plugin#options
const nextConfigWithSentry = withSentryConfig(nextConfig, {
  authToken: process.env['SENTRY_AUTH_TOKEN'],
  org: 'efp',
  project: 'web',
  silent: process.env['NODE_ENV'] !== 'development'
})

const nextConfigWithPlugins = () => plugins.reduce((_, plugin) => plugin(_), nextConfigWithSentry)

export default million.next(nextConfigWithPlugins, { auto: true })
