import * as v from 'valibot'

export const EnvironmentVariableSchema = v.object({
  NODE_ENV: v.union([v.literal('development'), v.literal('production'), v.literal('test')]),
  HOST: v.string(),
  PORT: v.number(),
  NEXT_PUBLIC_SITE_URL: v.string('NEXT_PUBLIC_SITE_URL must be a string', [v.url()]),
  APP_VERSION: v.string(),
  EFP_API_URL: v.string('EFP_API_URL must be a string', [v.url()]),
  NEXT_PUBLIC_EFP_API_URL: v.string('NEXT_PUBLIC_EFP_API_URL must be a string', [v.url()]),
  NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: v.string('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID must be a string'),
})

export type EnvironmentVariable = v.Input<typeof EnvironmentVariableSchema>

export const {
  success,
  output: env,
  issues,
} = v.safeParse(EnvironmentVariableSchema, process.env, { abortEarly: true, abortPipeEarly: true })

if (!success) {
  // console.error(issues)
  throw new Error('Environment variables are invalid')
}
