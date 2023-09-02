interface Environment {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  readonly ENVIRONMENT?: 'development' | 'production' | 'test'
}

declare namespace NodeJS {
  interface ProcessEnv extends Environment {}
}

/* Vite */
interface ImportMetaEnv extends Environment {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
