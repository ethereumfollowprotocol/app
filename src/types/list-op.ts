import type { Address } from 'viem'

export type ListOp = {
  version: number
  opcode: number
  data: Buffer
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
