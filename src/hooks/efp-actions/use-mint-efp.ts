import { useMemo } from 'react'
import { encodePacked, type Address } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'

import * as abi from 'src/lib/abi.ts'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts.ts'
import { generateListStorageLocationSlot } from '#/app/efp/utilities.ts'
import { DEFAULT_CHAIN } from '#/lib/constants/chain'

export function useMintEFP() {
  const { address: accountAddress } = useAccount()
  const { data: walletClient } = useWalletClient()
  const nonce = useMemo(() => generateListStorageLocationSlot(), [])

  const mint = async (selectedChainId?: number) => {
    if (!accountAddress) return

    const listRecordsContractAddress = selectedChainId
      ? (ListRecordContracts[selectedChainId] as Address)
      : coreEfpContracts.EFPListRecords

    try {
      const hash = await walletClient?.writeContract({
        // address: coreEfpContracts.EFPListRegistry,
        // abi: abi.efpListRegistryAbi,
        // functionName: 'mint',
        address: coreEfpContracts.EFPListMinter,
        abi: abi.efpListMinterAbi,
        functionName: 'easyMint',
        args: [
          encodePacked(
            ['uint8', 'uint8', 'uint256', 'address', 'uint'],
            [1, 1, BigInt(selectedChainId || DEFAULT_CHAIN.id), listRecordsContractAddress, nonce]
          )
        ]
      })

      return hash
    } catch (e: any) {
      throw new Error(e)
    }
  }

  return {
    mint,
    walletClient,
    nonce
  }
}
