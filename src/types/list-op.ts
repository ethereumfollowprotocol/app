import type { Address } from 'viem'

export type ListOp = {
  version: number
  opcode: number
  data: Buffer
}

// Specific type for tag operations
export type TagListOp = ListOp & {
  opcode: 3 | 4 // Assuming 3 and 4 are for add/remove tag operations
}

export type ListOpTagOpParams = {
  address: Address
  tag: string
}

export function listOpAsHexstring(listOp: ListOp): `0x${string}` {
  const versionHex = listOp.version.toString(16).padStart(2, '0')
  const opcodeHex = listOp.opcode.toString(16).padStart(2, '0')
  const dataHex = listOp.data.toString('hex')

  return `0x${versionHex}${opcodeHex}${dataHex}`
}

export function listOpAddListRecord(address: Address): ListOp {
  return {
    version: 1,
    opcode: 1,
    data: Buffer.from(address.slice(2), 'hex')
  }
}

export function listOpRemoveListRecord(address: Address): ListOp {
  return {
    version: 1,
    opcode: 2,
    data: Buffer.from(address.slice(2), 'hex')
  }
}

export function listOpAddTag(address: Address, tag: string): ListOp {
  return {
    version: 1,
    opcode: 3,
    data: Buffer.concat([Buffer.from(address.slice(2), 'hex'), Buffer.from(tag, 'utf8')])
  }
}

export function listOpRemoveTag(address: Address, tag: string): ListOp {
  return {
    version: 1,
    opcode: 4,
    data: Buffer.concat([Buffer.from(address.slice(2), 'hex'), Buffer.from(tag, 'utf8')])
  }
}

// Extract address and tag from a ListOp add/remove tag data buffer
export function extractAddressAndTag(listOp: TagListOp): { address: Address; tag: string } {
  const addressBytes = new Uint8Array(listOp.data.buffer, listOp.data.byteOffset, 20)
  const tagBytes = new Uint8Array(listOp.data.buffer, listOp.data.byteOffset + 20)

  const address = `0x${Buffer.from(addressBytes).toString('hex')}` as Address
  const tag = Buffer.from(tagBytes).toString('utf8')

  return { address, tag }
}

// Type guard to check if a ListOp is a TagListOp
export function isTagListOp(listOp: ListOp): listOp is TagListOp {
  return listOp.opcode === 3 || listOp.opcode === 4
}
