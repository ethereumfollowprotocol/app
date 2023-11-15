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
  transpilePackages: ['next-international', 'international-types'],
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
      source: '/docs',
      destination: 'https://docs.ethfollow.xyz',
      permanent: true
    }
  ],
  /** @param {WebpackConfiguration} config */
  webpack: config => {
    if (config.name === 'server' && config.optimization) {
      config.optimization.concatenateModules = false
    }
    /* WalletConnect x wagmi needed configuration */
    if (config.resolve) {
      config.resolve.fallback = { fs: false, net: false, tls: false }
    }
    if (Array.isArray(config.externals)) {
      config.externals.push('lokijs', 'pino-pretty', 'encoding')
    }
    if (config.plugins) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/
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
    // default is false
    hideSourceMaps: true,
    tunnelRoute: '/monitoring-tunnel',
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
    autoInstrumentMiddleware: true,
    autoInstrumentServerFunctions: true
  }
  // TODO: add headers for security
}

const nextConfigWithSentry = withSentryConfig(nextConfig, {
  authToken: process.env['SENTRY_AUTH_TOKEN'],
  org: 'efp',
  project: 'web',
  silent: process.env['NODE_ENV'] !== 'development'
},{
    // default is false
    hideSourceMaps: true,
    tunnelRoute: '/monitoring-tunnel',
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
    autoInstrumentMiddleware: true,
    autoInstrumentServerFunctions: true
})

const nextConfigWithPlugins = () => plugins.reduce((_, plugin) => plugin(_), nextConfigWithSentry)

export default million.next(nextConfigWithPlugins, { auto: true })
