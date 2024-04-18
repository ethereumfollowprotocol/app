import type { ListStorageLocation } from '#/app/efp/types'
import { generateListStorageLocationSlot } from '#/app/efp/utilities'
import { efpListRegistryAbi } from '#/lib/abi'
import { efpContracts } from '#/lib/constants/contracts'
import { useCallback, useMemo } from 'react'
import { encodePacked } from 'viem'
import { useChainId, useSimulateContract, useSwitchChain, useWriteContract } from 'wagmi'

// Chain ID to use when no chain ID is provided
const NO_CHAIN_ID = 0

/**
 * @description Create an EFP list by calling the mint function on the EFPListRegistry contract
 * This mints an nft to the user while setting the EFP list storage location
 * The List Storage Location value is stored in the main EFP List Registry contract and can be changed at any time by the EFP List NFT owner.
 * @param param0
 * @returns
 */
export const useCreateEFPList = ({ chainId }: { chainId: number | undefined }) => {
  const currentChainId = useChainId()
  const chainIdToUseForCreate = chainId || NO_CHAIN_ID
  const { switchChain } = useSwitchChain()

  // EFP List Storage Location version value, which is currently always 1
  const version: ListStorageLocation['version'] = 1
  // EFP List Storage Location locationType value, which is currently always 1
  const locationType: ListStorageLocation['locationType'] = 1
  // Keep the slot the same between renders
  const slot = useMemo(() => generateListStorageLocationSlot(), [])

  const listStorageLocation = encodePacked(
    ['uint8', 'uint8', 'uint256', 'address', 'uint'],
    [version, locationType, BigInt(chainIdToUseForCreate), efpContracts['EFPListRecords'], slot]
  )

  // Simulate the creation of an EFP list
  // If there's no chain ID, supply an invalid chain id (NO_CHAIN_ID) to force an error
  const {
    data: simulateCreateEFPListData,
    error: simulateCreateEFPListError,
    isPending: simulateCreateEFPListIsPending
  } = useSimulateContract({
    chainId: chainIdToUseForCreate,
    address: efpContracts['EFPListRegistry'],
    abi: efpListRegistryAbi,
    functionName: 'mint',
    args: [listStorageLocation]
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
