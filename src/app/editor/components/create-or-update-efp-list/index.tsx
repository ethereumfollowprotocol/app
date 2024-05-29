import { sepolia } from 'viem/chains'
import { useChains, useWalletClient } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'
import { createPublicClient, encodePacked, getContract, http, toHex } from 'viem'

import { Step } from './types'
import { useMintEFP } from '#/hooks/use-mint-efp'
import { useCart } from '#/contexts/cart-context'
import { SelectChainCard } from './select-chain-card'
import { efpContracts } from '#/lib/constants/contracts'
import { InitiateActionsCard } from './initiate-actions-card'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { TransactionStatusCard } from './transaction-status-card'
import { efpListRecordsAbi, efpListRegistryAbi } from '#/lib/abi'
import { extractAddressAndTag, isTagListOp } from '#/utils/list-ops'
// import { useCreateEFPList } from '#/hooks/efp-actions/use-create-efp-list'

import type { ChainWithDetails } from '#/lib/wagmi'
import { EFPActionType, type Action, useActions } from '#/contexts/actions-context'

interface CreateOrUpdateEFPListProps {
  setOpen: (open: boolean) => void
  hasCreatedEfpList?: boolean
}

const CreateOrUpdateEFPList: React.FC<CreateOrUpdateEFPListProps> = ({
  setOpen,
  hasCreatedEfpList
}) => {
  const chains = useChains() as unknown as ChainWithDetails[] // TODO: Fix this type issue

  const { mint, nonce: mintNonce } = useMintEFP()
  const { profile } = useEFPProfile()
  const { totalCartItems, cartItems } = useCart()
  const { data: walletClient } = useWalletClient()
  const listRegistryContract = getContract({
    address: efpContracts.EFPListRegistry,
    abi: efpListRegistryAbi,
    client: createPublicClient({ chain: sepolia, transport: http() })
  })
  const { addActions, executeActionByIndex, actions } = useActions()

  const [selectedChainId, setSelectedChainId] = useState<number>()
  const selectedChain = chains.find(chain => chain.id === selectedChainId)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  const listOpTx = async () => {
    const nonce = profile?.primary_list
      ? BigInt(
          `0x${(
            await listRegistryContract.read.getListStorageLocation([BigInt(profile?.primary_list)])
          ).slice(-64)}`
        )
      : mintNonce

    const operations = cartItems.map(item => {
      const types = ['uint8', 'uint8', 'uint8', 'uint8', 'address']
      const data: (string | number)[] = [item.listOp.version, item.listOp.opcode, 1, 1]

      if (item.listOp.opcode > 2 && isTagListOp(item.listOp)) {
        const addrrAndTag = extractAddressAndTag(item.listOp)
        types.push('bytes')
        data.push(...[addrrAndTag.address, toHex(addrrAndTag.tag)])
      } else {
        data.push(`0x${item.listOp.data.toString('hex')}`)
      }

      return encodePacked(types, data)
    })

    const hash = await walletClient?.writeContract({
      address: efpContracts.EFPListRecords,
      abi: efpListRecordsAbi,
      functionName: 'applyListOps',
      args: [nonce, operations]
    })

    return hash
  }

  // Prepare action functions
  // const { createEFPList } = useCreateEFPList({ chainId: selectedChain?.id })

  useEffect(() => {
    if (!selectedChainId) return

    // Prepare and set actions when selectedChain is updated and not null
    const cartItemAction: Action = {
      id: EFPActionType.UpdateEFPList, // Unique identifier for the action
      type: EFPActionType.UpdateEFPList,
      label: `${totalCartItems} edits to List Records`,
      chainId: selectedChainId,
      execute: listOpTx,
      isPendingConfirmation: false
    }

    const createEFPListAction: Action = {
      id: EFPActionType.CreateEFPList, // Unique identifier for the action
      type: EFPActionType.CreateEFPList,
      label: 'Create new EFP List',
      chainId: selectedChainId,
      execute: mint,
      isPendingConfirmation: false
    }

    const actions = hasCreatedEfpList ? [cartItemAction] : [createEFPListAction, cartItemAction]
    addActions(actions)
  }, [selectedChainId, totalCartItems, addActions, hasCreatedEfpList])

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
  const handleInitiateActions = useCallback(() => {
    setCurrentStep(Step.TransactionStatus)
    // Execute the first action
    executeActionByIndex(0)
  }, [executeActionByIndex])

  return (
    <div className='flex glass-card gap-6 flex-col w-[552px] items-center border-2 border-gray-200 text-center justify-between rounded-xl p-16'>
      {currentStep === Step.SelectChain && (
        <SelectChainCard
          chains={chains}
          onCancel={() => setOpen(false)}
          handleChainClick={handleChainClick}
          selectedChain={selectedChain}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === Step.InitiateTransactions && (
        <InitiateActionsCard
          actions={actions}
          setCurrentStep={setCurrentStep}
          selectedChain={selectedChain}
          handleInitiateActions={handleInitiateActions}
        />
      )}
      {currentStep === Step.TransactionStatus && <TransactionStatusCard setOpen={setOpen} />}
    </div>
  )
}

export default CreateOrUpdateEFPList
