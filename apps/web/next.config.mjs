import withBundleAnalyzer from '@next/bundle-analyzer'
import { NormalModuleReplacementPlugin } from 'webpack'

/********************
 * Add plugins here *
 * ******************/
const plugins = [
  // https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
  withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
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
  /** @param {import('webpack').Configuration} config */
  webpack: config => {
    if (!config?.resolve?.fallback || !config?.plugins) return config
    config.resolve.fallback = { fs: false, net: false, tls: false, crypto: false }
    config.plugins.push(
      new NormalModuleReplacementPlugin(/node:/, resource => {
        resource.request = resource.request.replace(/^node:/, '')
      }),
    )
    return config
  },
  poweredByHeader: false,
  // TODO: add headers for security
}

export default () => plugins.reduce((_, plugin) => plugin(_), nextConfig)
