import type { Chain, Address } from 'viem'

import { Step } from '#/components/checkout/types'
import LoadingSpinner from '#/components/loaders/loading-spinner'
import useSaveListSettings from '../hooks/use-save-list-settings'
import TransactionStatus from '#/components/checkout/transaction-status'
import InitiateActionsCard from '#/components/checkout/initiate-actions-card'
import type { FollowingResponse, ProfileDetailsResponse } from '#/types/requests'

export interface SaveSettingsProps {
  selectedList: number
  profile: ProfileDetailsResponse
  chain?: Chain
  newChain?: Chain
  slot?: bigint
  owner?: string
  manager?: string
  user?: string
  listRecordsContractAddress?: Address
  changedValues: {
    chain: boolean
    owner: boolean
    manager: boolean
    user: boolean
    setPrimary: boolean
    resetSlot: boolean
  }
  onClose: () => void
  onCancel: () => void
  listState?: FollowingResponse[]
  isListStateLoading?: boolean
  isPrimaryList: boolean
}

const SaveSettings: React.FC<SaveSettingsProps> = ({
  selectedList,
  profile,
  chain,
  newChain,
  slot,
  owner,
  manager,
  user,
  listRecordsContractAddress,
  changedValues,
  onClose,
  onCancel,
  listState,
  isListStateLoading,
  isPrimaryList,
}) => {
  const { actions, onFinish, currentStep, setCurrentStep, onNextAction, onInitiateActions } = useSaveListSettings({
    slot,
    user,
    owner,
    chain,
    profile,
    manager,
    onClose,
    onCancel,
    newChain,
    listState,
    selectedList,
    changedValues,
    isPrimaryList,
    listRecordsContractAddress,
  })

  return (
    <div className='w-full flex justify-center px-4 pt-[6.75rem] pb-16 overflow-scroll sm:pt-32'>
      <div className='flex glass-card gap-4 sm:gap-6 flex-col w-full sm:w-[532px] items-center border-[3px] border-grey text-center justify-between rounded-xl px-4 py-8 sm:p-12'>
        {changedValues.chain && isListStateLoading ? (
          <div className='w-full h-144'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {currentStep === Step.InitiateTransactions && (
              <InitiateActionsCard
                actions={actions}
                onCancel={onCancel}
                setCurrentStep={setCurrentStep}
                handleInitiateActions={onInitiateActions}
              />
            )}
            {currentStep === Step.TransactionStatus && (
              <TransactionStatus
                onFinish={onFinish}
                setCurrentStep={setCurrentStep}
                handleNextAction={onNextAction}
                handleReInitiateActions={onInitiateActions}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SaveSettings
