/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 * @typedef {import('webpack').Configuration} WebpackConfiguration
 **/
import webpack from 'webpack'

/** @type {NextConfigPlugins} */
const plugins = []

if (process.env['ANALYZE']) {
  const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer({ enabled: true }))
}

if (process.env['DISABLE_PWA'] === 'false' && process.env['NODE_ENV'] === 'production') {
  const { default: withPWA } = await import('next-pwa')
  plugins.push(withPWA({ dest: 'public' }))
}

/** @type {NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env['NODE_ENV'] === 'production',
  },
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ['next-international', 'international-types'],
  // we run using `prebuild` script
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverActions: true,
    scrollRestoration: true,
  },
  /** @param {WebpackConfiguration} config */
  webpack: config => {
    if (config.name === 'server' && config.optimization) {
      config.optimization.concatenateModules = false
    }
    if (config.resolve) {
      config.resolve.fallback = { fs: false, net: false, tls: false, crypto: false }
    }
    if (config.plugins) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        }),

        new webpack.NormalModuleReplacementPlugin(/node:/, resource => {
          resource.request = resource.request.replace(/^node:/, '')
        }),
      )
    }
    return config
  },
  cleanDistDir: true,
  poweredByHeader: false,
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  redirects: async () => [
    {
      source: '/(twitter|x)',
      destination: 'https://x.com/ethfollowpr',
      permanent: true,
    },
    {
      source: '/github',
      destination: 'https://github.com/ethereumfollowprotocol',
      permanent: true,
    },
    {
      source: '/docs',
      destination: 'https://docs.ethfollow.xyz',
      permanent: true,
    },
  ],
  // TODO: add headers for security
}

const nextConfigWithPlugins = () => plugins.reduce((_, plugin) => plugin(_), nextConfig)

export default nextConfigWithPlugins
