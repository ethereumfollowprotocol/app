export type Flatten<T> = T extends any[] ? T[number] : T

export type ExtractTypeFromUnion<T, Excluded> = T extends (infer U & Excluded) | undefined
  ? U
  : never

export type Pretty<T> = {
  [K in keyof T]: T[K]
} & {}
