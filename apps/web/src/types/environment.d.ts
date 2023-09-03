interface Environment {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly ENVIRONMENT?: 'development' | 'production' | 'test'
  PUBLIC_ALCHEMY_API_KEY: string
  WALLET_CONNECT_PROJECT_ID: string
  PUBLIC_WALLET_CONNECT_PROJECT_ID: string
}

declare namespace NodeJS {
  interface ProcessEnv extends Environment {}
}

/* Vite */
interface ImportMetaEnv extends Environment {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
