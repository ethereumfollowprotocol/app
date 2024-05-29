import type { GetEnsAvatarReturnType } from 'viem'

declare global {
  interface Window {
    // access via `window._APP_VERSION_`. The value is commit hash
    readonly _APP_VERSION_: string
  }
}

export type Address = `0x${string}`
export type Hex = `0x${string}`

export type Flatten<T> = T extends any[] ? T[number] : T

export type ExtractTypeFromUnion<T, Excluded> = T extends (infer U & Excluded) | undefined
  ? U
  : never

export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}

export interface ENSProfile {
  name?: string
  address: Address
  avatar?: string | GetEnsAvatarReturnType
  display?: string
  records?: {
    avatar: string
    [key: string]: string
  }
  chains?: { [key: string]: string }
  fresh?: number
  resolver?: string
  errors?: { [key: string]: string }
}

export type NoRepetition<U extends string, ResultT extends any[] = []> =
  | ResultT
  | {
      [k in U]: NoRepetition<Exclude<U, k>, [k, ...ResultT]>
    }[U]
