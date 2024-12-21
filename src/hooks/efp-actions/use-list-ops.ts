import { encodePacked, type Address } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'

import { efpListRecordsAbi } from '#/lib/abi'
import type { CartItem } from '#/contexts/cart-context'

interface GetListOpsTransactionProps {
  nonce: bigint
  items: CartItem[]
  selectedList?: number
  listRecordsContract: Address
}

export const useListOps = () => {
  const { address: userAddress } = useAccount()
  const { data: walletClient } = useWalletClient()

  const getListOpsTransaction = async ({
    nonce,
    items,
    selectedList,
    listRecordsContract
  }: GetListOpsTransactionProps) => {
    // format list operations
    const operations = items.map(item => {
      const types = ['uint8', 'uint8', 'uint8', 'uint8', 'bytes']
      const data: (string | number)[] = [
        item.listOp.version,
        item.listOp.opcode,
        1,
        1,
        item.listOp.data
      ]

      return encodePacked(types, data)
    })

    // initiate "setMetadataValuesAndApplyListOps" transaction when creating a new EFP list
    // initiate "applyListOps" transaction when updating an existing EFP list
    const hash = await walletClient?.writeContract({
      address: listRecordsContract,
      abi: efpListRecordsAbi,
      functionName: selectedList ? 'applyListOps' : 'setMetadataValuesAndApplyListOps',
      // @ts-ignore - diff data type handled
      args: selectedList
        ? [nonce, operations]
        : [nonce, [{ key: 'user', value: userAddress }], operations]
    })

    return hash
  }

  return { getListOpsTransaction }
}
