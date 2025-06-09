// Due to Thirdweb's overriding of the `addressType` of `abitype`
// We got many errors. Here, we revert it to its original value
// Check here (https://github.com/thirdweb-dev/js/issues/6810#issue-3010460693) for more context

declare module 'abitype' {
  export interface Register {
    addressType: `0x${string}`
  }
}

export {}
