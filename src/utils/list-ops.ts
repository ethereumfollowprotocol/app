import type { Address } from 'viem'
import type { ListOp, TagListOp } from '#/types/list-op'

export const listOpAsHexstring = (listOp: ListOp): `0x${string}` => {
  const versionHex = listOp.version.toString(16).padStart(2, '0')
  const opcodeHex = listOp.opcode.toString(16).padStart(2, '0')
  const dataHex = listOp.data.toString('hex')

  return `0x${versionHex}${opcodeHex}${dataHex}`
}

export const listOpAddListRecord = (address: Address): ListOp => {
  return {
    version: 1,
    opcode: 1,
    data: Buffer.from(address.slice(2), 'hex')
  }
}

export const listOpRemoveListRecord = (address: Address): ListOp => {
  return {
    version: 1,
    opcode: 2,
    data: Buffer.from(address.slice(2), 'hex')
  }
}

export const listOpAddTag = (address: Address, tag: string): ListOp => {
  return {
    version: 1,
    opcode: 3,
    data: Buffer.concat([Buffer.from(address.slice(2), 'hex'), Buffer.from(tag, 'utf8')])
  }
}

export const listOpRemoveTag = (address: Address, tag: string): ListOp => {
  return {
    version: 1,
    opcode: 4,
    data: Buffer.concat([Buffer.from(address.slice(2), 'hex'), Buffer.from(tag, 'utf8')])
  }
}

// Extract address and tag from a ListOp add/remove tag data buffer
export const extractAddressAndTag = (listOp: TagListOp): { address: Address; tag: string } => {
  const addressBytes = new Uint8Array(listOp.data.buffer, listOp.data.byteOffset, 20)
  const tagBytes = new Uint8Array(listOp.data.buffer, listOp.data.byteOffset + 20)

  const address = `0x${Buffer.from(addressBytes).toString('hex')}` as Address
  const tag = Buffer.from(tagBytes).toString('utf8')

  return { address, tag }
}

// Type guard to check if a ListOp is a TagListOp
export const isTagListOp = (listOp: ListOp): listOp is TagListOp => {
  return listOp.opcode === 3 || listOp.opcode === 4
}
