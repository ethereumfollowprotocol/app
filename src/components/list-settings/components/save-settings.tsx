import type { Chain, Address } from 'viem'

import { Step } from '#/components/checkout/types'
import type { ProfileDetailsResponse } from '#/api/requests'
import useSaveListSettings from '../hooks/use-save-list-settings'
import TransactionStatus from '#/components/checkout/transaction-status'
import { InitiateActionsCard } from '#/components/checkout/initiate-actions-card'

export interface SaveSettingsProps {
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
  }
  onClose: () => void
  onCancel: () => void
}

const SaveSettings: React.FC<SaveSettingsProps> = ({
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
  onCancel
}) => {
  const { actions, onFinish, currentStep, setCurrentStep, handleInitiateActions } =
    useSaveListSettings({
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
      onCancel
    })

  return (
    <main className='h-screen w-full flex justify-center items-center'>
      <div className='flex glass-card gap-4 sm:gap-6 flex-col w-full sm:w-[552px] items-center border-2 border-gray-200 text-center justify-between rounded-xl p-6 py-8 sm:p-16'>
        {currentStep === Step.InitiateTransactions && (
          <InitiateActionsCard
            actions={actions}
            onCancel={onCancel}
            setCurrentStep={setCurrentStep}
            handleInitiateActions={handleInitiateActions}
          />
        )}
        {currentStep === Step.TransactionStatus && (
          <TransactionStatus
            onFinish={onFinish}
            setCurrentStep={setCurrentStep}
            handleReInitiateActions={handleInitiateActions}
          />
        )}
      </div>
    </main>
  )
}

export default SaveSettings
