import { generateListStorageLocationSlot } from '#/app/efp/utilities'
import { efpListRegistryAbi } from '#/lib/abi'
import { efpContracts } from '#/lib/constants/contracts'
import { useCallback, useMemo } from 'react'
import { encodePacked } from 'viem'
import { useChainId, useSimulateContract, useSwitchChain, useWriteContract } from 'wagmi'

const NO_CHAIN_ID = 0

export const useCreateEFPList = ({ chainId }: { chainId: number | undefined }) => {
  const currentChainId = useChainId()
  const chainIdToUseForCreate = chainId || NO_CHAIN_ID
  const { switchChain } = useSwitchChain()

  // Keep the same nonce between renders
  const nonce = useMemo(() => generateListStorageLocationSlot(), [])

  // Simulate the creation of an EFP list
  // If there's no chain ID, supply an invalid chain id (NO_CHAIN_ID) to force an error
  const {
    data: simulateCreateEFPListData,
    error: simulateCreateEFPListError,
    isPending: simulateCreateEFPListIsPending
  } = useSimulateContract({
    chainId: chainIdToUseForCreate,
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    functionName: 'mint',
    args: [
      encodePacked(
        ['uint8', 'uint8', 'uint256', 'address', 'uint'],
        [1, 1, BigInt(chainIdToUseForCreate), efpContracts.EFPListRecords, nonce]
      )
    ]
  })

  const {
    writeContractAsync,
    data: hash,
    isPending: createEFPListIsPendingUserConfirmation, // is awaiting user confirmation
    error: createEFPListError
  } = useWriteContract()

  const createEFPList = useCallback(async () => {
    if (!chainId) throw new Error('Chain ID is required to create EFP list.')

    // Switch chain if not the selected chain to store/create the EFP list
    if (chainId !== currentChainId) {
      switchChain({ chainId })
    }

    // Handle no simulated data and/or error
    if (!simulateCreateEFPListData?.request)
      throw new Error('Error simulating createEFPListData request.')

    // Use the simulated data to write the contract
    return await writeContractAsync(simulateCreateEFPListData.request)
  }, [currentChainId, simulateCreateEFPListData?.request, switchChain, writeContractAsync, chainId])

  return {
    simulateCreateEFPListData,
    simulateCreateEFPListError,
    simulateCreateEFPListIsPending,
    createEFPList,
    hash,
    createEFPListIsPendingUserConfirmation,
    createEFPListError
  }
}
