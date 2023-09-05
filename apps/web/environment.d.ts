interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test'
}

declare module NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
