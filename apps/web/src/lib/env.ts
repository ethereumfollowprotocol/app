import * as v from 'valibot'

const EnvironmentSchema = v.object({
  NODE_ENV: v.union([v.literal('development'), v.literal('production'), v.literal('test')]),
  ENVIRONMENT: v.optional(
    v.union([v.literal('development'), v.literal('production'), v.literal('test')]),
  ),
})

export type Env = v.Output<typeof EnvironmentSchema>

export const environment = v.parse(EnvironmentSchema, process.env) satisfies Env
