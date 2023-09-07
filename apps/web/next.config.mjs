/** 
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 **/
import webpack from 'webpack'

/** @type {NextConfigPlugins} */
const plugins = []

if (Boolean(process.env['ANALYZE'])) {
  const { default: withBundleAnalyzer } = await import('@next/bundle-analyzer')
  plugins.push(withBundleAnalyzer({ enabled: true }))
}

if (process.env['NODE_ENV'] === 'production') {
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
  /** @param {webpack.Configuration} config */
  webpack: config => {
    if (!config?.resolve?.fallback || !config?.plugins) return config
    config.resolve.fallback = { fs: false, net: false, tls: false, crypto: false }
    if (!config?.plugins) return config
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/node:/, resource => {
        resource.request = resource.request.replace(/^node:/, '')
      }),
    )
    return config
  },
  poweredByHeader: false,
  // TODO: add headers for security
}

const nextConfigWithPlugins = () => plugins.reduce((_, plugin) => plugin(_), nextConfig)

export default nextConfigWithPlugins
