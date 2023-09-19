interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly WALLET_CONNECT_PROJECT_ID: string
  readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string
  readonly ALCHEMY_ID: string
  readonly NEXT_PUBLIC_ALCHEMY_ID: string
  readonly LLAMAFOLIO_ID: string
  readonly NEXT_PUBLIC_LLAMAFOLIO_ID: string
  readonly INFURA_ID: string
  readonly NEXT_PUBLIC_INFURA_ID: string
  readonly SITE_URL: string
  readonly NEXT_PUBLIC_SITE_URL: string
  // automatically added by Vercel
  readonly VERCEL_URL?: string
  readonly NEXT_PUBLIC_VERCEL_URL?: string
  readonly DISABLE_PWA: 'true' | 'false'
}

declare module NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
