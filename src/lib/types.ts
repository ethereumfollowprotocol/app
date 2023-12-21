declare global {
  interface Window {
    // access via `window._APP_VERSION_`. The value is commit hash
    readonly _APP_VERSION_: string
  }
}

export type Flatten<T> = T extends any[] ? T[number] : T

export type ExtractTypeFromUnion<T, Excluded> = T extends (infer U & Excluded) | undefined
  ? U
  : never

export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}

export interface EnsProfile {
  name: string
  address: string
  avatar: string
  display: string
  records: {
    avatar: string
    [key: string]: string
  }
  chains: { [key: string]: string }
  fresh: number
  resolver: string
  errors: { [key: string]: string }
}
