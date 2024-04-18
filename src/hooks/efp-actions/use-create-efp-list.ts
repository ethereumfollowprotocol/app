import type { ListStorageLocation } from '#/app/efp/types'
import { generateListStorageLocationSlot } from '#/app/efp/utilities'
import { efpListRegistryAbi } from '#/lib/abi'
import { efpContracts } from '#/lib/constants/contracts'
import { useCallback, useMemo } from 'react'
import { encodePacked } from 'viem'
import { foundry, mainnet } from 'viem/chains'
import { useChainId, useSimulateContract, useSwitchChain, useWriteContract } from 'wagmi'

/**
 * @description Create an EFP list by calling the mint function on the EFPListRegistry contract
 * This mints an nft to the user while setting the EFP list storage location
 * The List Storage Location value is stored in the main EFP List Registry contract and can be changed at any time by the EFP List NFT owner.
 * The EFP List Registry is always on mainnet, so the user must switch to mainnet to create an EFP list.
 * @param listStorageLocationChainId - The chain ID to store the EFP list on; defaults to mainnet if not provided
 * @returns
 */
export const useCreateEFPList = ({
  listStorageLocationChainId = mainnet.id
}: { listStorageLocationChainId: number | undefined }) => {
  const currentChainId = useChainId()
  // Use the mainnet chain ID if we're not testing, otherwise use the foundry chain ID
  const mainnetChainId = currentChainId === foundry.id ? foundry.id : mainnet.id
  const { switchChain } = useSwitchChain()

  // EFP List Storage Location version value, which is currently always 1
  const version: ListStorageLocation['version'] = 1
  // EFP List Storage Location locationType value, which is currently always 1
  const locationType: ListStorageLocation['locationType'] = 1
  // Keep the slot the same between renders
  const slot = useMemo(() => generateListStorageLocationSlot(), [])

  const listStorageLocation = encodePacked(
    ['uint8', 'uint8', 'uint256', 'address', 'uint'],
    [
      version,
      locationType,
      BigInt(listStorageLocationChainId),
      efpContracts['EFPListRecords'],
      slot
    ]
  )

  // Simulate the creation of an EFP list
  // If there's no chain ID, supply an invalid chain id (NO_CHAIN_ID) to force an error
  const {
    data: simulateCreateEFPListData,
    error: simulateCreateEFPListError,
    isPending: simulateCreateEFPListIsPending
  } = useSimulateContract({
    chainId: listStorageLocationChainId,
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
    if (!listStorageLocationChainId)
      throw new Error('listStorageLocationChainId is required to create an EFP list.')

    // Switch chain to mainnet since the EFP List Registry contract is only deployed on mainnet
    if (currentChainId !== mainnet.id) {
      switchChain({ chainId: mainnet.id })
    }

    // Handle no simulated data and/or error
    if (!simulateCreateEFPListData?.request)
      throw new Error('Error simulating createEFPListData request.')

    // Use the simulated data to write the contract
    return await writeContractAsync(simulateCreateEFPListData.request)
  }, [
    currentChainId,
    simulateCreateEFPListData?.request,
    switchChain,
    writeContractAsync,
    listStorageLocationChainId
  ])

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
