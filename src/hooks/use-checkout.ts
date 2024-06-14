import { useCallback, useEffect, useState } from 'react'
import { useChainId, useChains, useSwitchChain, useWalletClient } from 'wagmi'
import {
  http,
  toHex,
  fromHex,
  getContract,
  encodePacked,
  type Address,
  createPublicClient
} from 'viem'

import { useCart } from '#/contexts/cart-context'
import { Step } from '#/components/checkout/types'
import type { ChainWithDetails } from '#/lib/wagmi'
import { useMintEFP } from './efp-actions/use-mint-efp'
import { coreEfpContracts, ListRecordContracts } from '#/lib/constants/contracts'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import { extractAddressAndTag, isTagListOp } from '#/utils/list-ops'
import { EFPActionType, useActions, type Action } from '#/contexts/actions-context'
import { useRouter } from 'next/navigation'
import { DEFAULT_CHAIN } from '#/lib/constants/chain'

const useCheckout = () => {
  const chains = useChains()

  const router = useRouter()
  const currentChainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { mint, nonce: mintNonce } = useMintEFP()
  const { data: walletClient } = useWalletClient()
  const { totalCartItems, cartItems, resetCart } = useCart()
  const { profile, refetchFollowing, refetchProfile } = useEFPProfile()
  const { addActions, executeActionByIndex, actions, resetActions } = useActions()

  // get contract for selected chain to pull list storage location from
  const listRegistryContract = getContract({
    address: coreEfpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({ chain: DEFAULT_CHAIN, transport: http() })
  })

  // Set step to initiating transactions if the user has already created their EFP list
  // Selecting the chain is only an option when creating a new EFP list to select List records location
  const [currentStep, setCurrentStep] = useState(
    profile?.primary_list ? Step.InitiateTransactions : Step.SelectChain
  )

  const [selectedChainId, setSelectedChainId] = useState<number>(DEFAULT_CHAIN.id)
  const selectedChain = chains.find(chain => chain.id === selectedChainId) as ChainWithDetails

  const listOpTx = useCallback(async () => {
    // Get list storage location via token ID
    const listStorageLocation = profile?.primary_list
      ? await listRegistryContract.read.getListStorageLocation([BigInt(profile?.primary_list)])
      : null

    // Get slot, chain, and List Records contract from storage location or use options from the mint
    const nonce = listStorageLocation ? BigInt(`0x${listStorageLocation.slice(-64)}`) : mintNonce
    const ListRecordsContract = listStorageLocation
      ? (`0x${listStorageLocation.slice(70, 110)}` as Address)
      : selectedChainId
        ? (ListRecordContracts[selectedChainId] as Address)
        : coreEfpContracts.EFPListRecords

    // format list operations
    const operations = cartItems.map(item => {
      // append mandatory types and data
      const types = ['uint8', 'uint8', 'uint8', 'uint8', 'address']
      const data: (string | number)[] = [item.listOp.version, item.listOp.opcode, 1, 1]

      if (item.listOp.opcode > 2 && isTagListOp(item.listOp)) {
        // add 'bytes' type for the tag and address and tag to data
        const addrrAndTag = extractAddressAndTag(item.listOp)
        types.push('bytes')
        data.push(...[addrrAndTag.address, toHex(addrrAndTag.tag)])
      } else {
        // add address to data
        data.push(`0x${item.listOp.data.toString('hex')}`)
      }

      // return encoded data into a single HEX string
      return encodePacked(types, data)
    })

    // initiate  'applyListOps' transaction
    const hash = await walletClient?.writeContract({
      address: ListRecordsContract,
      abi: efpListRecordsAbi,
      functionName: 'applyListOps',
      args: [nonce, operations]
    })

    // return transaction hash to enable following transaction status in transaction details component
    return hash
  }, [walletClient, selectedChain])

  const setActions = useCallback(async () => {
    // getting the chain ID where the list operations will be performed (selected chain ID if EFP list minted before)
    const chainId = profile?.primary_list
      ? fromHex(
          `0x${(
            await listRegistryContract.read.getListStorageLocation([BigInt(profile?.primary_list)])
          ).slice(64, 70)}`,
          'number'
        )
      : selectedChain?.id

    if (!chainId) return

    // Prepare and set actions when selectedChain is updated and not null
    const cartItemAction: Action = {
      id: EFPActionType.UpdateEFPList, // Unique identifier for the action
      type: EFPActionType.UpdateEFPList,
      label: `${totalCartItems} List ops`,
      chainId,
      execute: listOpTx,
      isPendingConfirmation: false
    }

    const createEFPListAction: Action = {
      id: EFPActionType.CreateEFPList, // Unique identifier for the action
      type: EFPActionType.CreateEFPList,
      label: 'create list',
      chainId: DEFAULT_CHAIN.id, // Chain ID where main contracts are stored at
      execute: async () => await mint(selectedChainId),
      isPendingConfirmation: false
    }

    // add Create list action if user doesn't have the EFP list yet
    const actionsToExecute = profile?.primary_list
      ? [cartItemAction]
      : [createEFPListAction, cartItemAction]
    addActions(actionsToExecute)
  }, [selectedChainId, totalCartItems, addActions, profile, walletClient])

  useEffect(() => {
    setActions()
  }, [setActions])

  // Handle selecting a chain
  const handleChainClick = useCallback((chainId: number) => {
    setSelectedChainId(chainId)
  }, [])

  // Move to the next step
  const handleNextStep = useCallback(() => {
    if (!selectedChain) return
    setCurrentStep(Step.InitiateTransactions)
  }, [selectedChain])

  // Handle action initiation
  const handleInitiateActions = useCallback(async () => {
    const chainId =
      actions[0]?.label === 'create list'
        ? DEFAULT_CHAIN.id
        : profile?.primary_list
          ? fromHex(
              `0x${(
                await listRegistryContract.read.getListStorageLocation([
                  BigInt(profile?.primary_list)
                ])
              ).slice(64, 70)}`,
              'number'
            )
          : selectedChain?.id

    if (!chainId) return
    if (currentChainId !== chainId) {
      switchChain({ chainId })
      return
    }

    setCurrentStep(Step.TransactionStatus)
    executeActionByIndex(0)
  }, [executeActionByIndex, currentChainId, selectedChain, actions])

  const onFinish = useCallback(() => {
    resetCart()
    resetActions()
    refetchProfile()
    refetchFollowing()
    router.push('/profile')
  }, [resetActions, resetCart])

  return {
    chains,
    actions,
    onFinish,
    currentStep,
    setCurrentStep,
    selectedChain,
    selectedChainId,
    setSelectedChainId,
    handleChainClick,
    handleNextStep,
    handleInitiateActions
  }
}

export default useCheckout
