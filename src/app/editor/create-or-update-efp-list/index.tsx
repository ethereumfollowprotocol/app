import { useCart } from '#/contexts/cart-context'
import type { ChainWithDetails } from '#/lib/wagmi'
import { Box } from '@radix-ui/themes'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SelectChainCard } from './select-chain-card'
import { Step } from './types'
import { InitiateActionsCard } from './initiate-actions-card'
import { TransactionStatusCard } from './transaction-status-card'
// import { useCreateEFPList } from '#/hooks/efp-actions/use-create-efp-list'
import { EFPActionType, type Action, useActions } from '#/contexts/actions-context'
import { useChains, useWalletClient } from 'wagmi'
import { efpContracts } from '#/lib/constants/contracts'
import * as abi from 'src/lib/abi.ts'
import { generateListStorageLocationSlot } from '#/app/efp/utilities'
import { encodePacked } from 'viem'
import { mint } from '#/app/efp/actions'
import { extractAddressAndTag, isTagListOp } from '#/types/list-op'

interface CreateOrUpdateEFPListProps {
  setOpen?: (open: boolean) => void // setOpen prop for this component's parent modal, which is passed to TransactionStatusCard to finish the process
}

export function CreateOrUpdateEFPList({ setOpen }: CreateOrUpdateEFPListProps) {
  // Any chains specified in wagmi are valid
  const chains = useChains() as unknown as ChainWithDetails[] // TODO: Fix this type issue
  const nonce = useMemo(() => generateListStorageLocationSlot(), [])
  // Setup states and context hooks
  const hasCreatedEfpList = true // Placeholder
  const { totalCartItems, cartItems } = useCart()
  const { addActions, executeActionByIndex, actions } = useActions()

  const [selectedChainId, setSelectedChainId] = useState<number>()
  const selectedChain = chains.find(chain => chain.id === selectedChainId)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  // TODO: Implement real tx
  // Sim tx instead of real tx for now
  const { data: walletClient } = useWalletClient()

  const listOpTx = async () => {
    // const listOpsToPerform = []
    console.log('listOpTx')

    const operations = cartItems.map(item => {
      const types = ['uint8', 'uint8', 'uint8', 'uint8', 'address']
      const data: (string | number)[] = [item.listOp.version, item.listOp.opcode, 1, 1]

      if (item.listOp.opcode > 2 && isTagListOp(item.listOp)) {
        const addrrAndTag = extractAddressAndTag(item.listOp)
        types.push('bytes')
        data.concat([addrrAndTag.address, addrrAndTag.tag])
      } else {
        data.push(`0x${item.listOp.data.toString('hex')}`)
      }

      return encodePacked(types, data)
    })

    const hash = await walletClient?.writeContract({
      address: efpContracts.EFPListRecords,
      abi: abi.efpListRecordsAbi,
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
  }, [selectedChainId, totalCartItems, addActions])

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
    <Box className='flex flex-col items-center text-center justify-between h-full w-full'>
      {currentStep === Step.SelectChain && (
        <SelectChainCard
          chains={chains}
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
    </Box>
  )
}
