interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly WALLET_CONNECT_PROJECT_ID: string
  readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string
  readonly MAINNET_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_MAINNET_ALCHEMY_ID: string
  readonly OPTIMISM_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID: string
  readonly SEPOLIA_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID: string
  readonly LLAMAFOLIO_ID: string
  readonly NEXT_PUBLIC_LLAMAFOLIO_ID: string
  readonly INFURA_ID: string
  readonly NEXT_PUBLIC_INFURA_ID: string
  readonly ANKR_ID: string
  readonly NEXT_PUBLIC_ANKR_ID: string
  readonly SITE_URL: string
  readonly NEXT_PUBLIC_SITE_URL: string
  readonly DISABLE_PWA: 'true' | 'false'
  readonly ANALYZE: 'true' | 'false'
  /* automatically added by Vercel */
  readonly VERCEL_URL?: string
  readonly NEXT_PUBLIC_VERCEL_URL?: string
  /* Sentry */
  readonly SENTRY_DSN: string
  readonly NEXT_PUBLIC_SENTRY_DSN: string
  readonly SENTRY_AUTH_TOKEN: string
  readonly SENTRY_ENVIRONMENT: string
  readonly SENTRY_ORG: string
  readonly SENTRY_PROJECT: string
  readonly SENTRY_RELEASE: string
  readonly SENTRY_DISABLED: 'true' | 'false'
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
