export type Pretty<T> = { [K in keyof T]: T[K] } & {}

export type HTMLElementType<T> = T extends HTMLElement ? T : never
