import type { ListOpType } from 'ethereum-identity-kit'
import type { Address } from 'viem'

export type ListOp = ListOpType

// Specific type for tag operations
export type TagListOp = ListOp & {
  opcode: 3 | 4 // Assuming 3 and 4 are for add/remove tag operations
}

export type ListOpTagOpParams = {
  address: Address
  tag: string
}
