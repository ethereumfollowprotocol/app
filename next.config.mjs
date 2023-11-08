/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 * @typedef {import('webpack').Configuration} WebpackConfiguration
 **/
import webpack from 'webpack'
import million from 'million/compiler'

/** @type {NextConfigPlugins} */
const plugins = []

if (process.env['ANALYZE']) {
  const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer({ enabled: true }))
}

/** @type {NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {},
  transpilePackages: ['next-international', 'international-types'],
  // we run using `prebuild` script
  eslint: { ignoreDuringBuilds: true },
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

export default million.next(nextConfigWithPlugins, {
  auto: true,
})
