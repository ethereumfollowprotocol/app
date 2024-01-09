declare global {
  interface BigInt {
    toJSON(): string
  }
}

// Lets us use BigInts in JSON.stringify
BigInt.prototype['toJSON'] = function () {
  return this.toString()
}

export type {}
