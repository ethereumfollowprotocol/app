import { useMemo } from 'react'
import { encodePacked } from 'viem'
import { useAccount, useChainId, useWalletClient } from 'wagmi'

import * as abi from 'src/lib/abi.ts'
import { efpContracts } from '#/lib/constants/contracts.ts'
import { generateListStorageLocationSlot } from '#/app/efp/utilities.ts'

export function useMintEFP() {
  const chainId = useChainId()
  const { address: accountAddress } = useAccount()
  const { data: walletClient } = useWalletClient()
  const nonce = useMemo(() => generateListStorageLocationSlot(), [])

  const mint = async () => {
    if (!accountAddress) return

    try {
      const hash = await walletClient?.writeContract({
        // address: efpContracts.EFPListRegistry,
        // abi: abi.efpListRegistryAbi,
        // functionName: 'mint',
        address: efpContracts.EFPListMinter,
        abi: abi.efpListMinterAbi,
        functionName: 'easyMint',
        args: [
          encodePacked(
            ['uint8', 'uint8', 'uint256', 'address', 'uint'],
            [1, 1, BigInt(chainId), efpContracts.EFPListRecords, nonce]
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
