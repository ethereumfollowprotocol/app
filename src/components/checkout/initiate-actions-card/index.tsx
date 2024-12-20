import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Step } from '../types'
import { useCart } from '#/contexts/cart-context'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import RequiredTransaction from './required-transactions'
import CancelButton from '#/components/buttons/cancel-button'
import { PrimaryButton } from '#/components/buttons/primary-button'
import { EFPActionType, useActions, type Action } from '#/contexts/actions-context'

interface InitiateActionsCardProps {
  actions: Action[]
  onCancel: () => void
  setCurrentStep: (step: Step) => void
  handleInitiateActions: () => void
}

const InitiateActionsCard: React.FC<InitiateActionsCardProps> = ({
  actions,
  onCancel,
  setCurrentStep,
  handleInitiateActions,
}) => {
  const { t } = useTranslation()
  const { totalCartItems } = useCart()
  const { isCorrectChain } = useActions()

  const listOpActions = actions.filter((action) => action.type === EFPActionType.UpdateEFPList)
  const transformedActions = useMemo(() => {
    const cartActions = actions.filter((action) => action.type === EFPActionType.UpdateEFPList)
    const otherActions = actions.filter((action) => action.type !== EFPActionType.UpdateEFPList)

    const totalCartAction = {
      id: `${EFPActionType.UpdateEFPList}`, // Unique identifier for the action
      type: EFPActionType.UpdateEFPList,
      label: cartActions[0]?.label.includes('Transfer List State')
        ? 'Transfer List State'
        : `${totalCartItems} ${t('list ops')}`,
      chainId: cartActions[0]?.chainId || DEFAULT_CHAIN.id,
      execute: cartActions[0]?.execute,
      isPendingConfirmation: false,
    }

    return cartActions.length === 0 ? [...otherActions] : [totalCartAction, ...otherActions]
  }, [actions])

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{t('action title')}</h1>
        <p className="text-lg">{t('summary')}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl sm:text-2xl font-bold">{t('actions')}</p>
        <div>
          {transformedActions
            .filter((action) => action.chainId)
            .map((action, index) => (
              <div className="flex flex-col items-center" key={`${action.id}-${index}`}>
                {/* <CheckIcon className='left-0 text-lime-500 relative -ml-12 w-10 h-10' /> */}
                <div className="flex items-center gap-2">
                  <p className="font-bold">{action.label === 'create list' ? t(action.label) : action.label}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-center text-lg font-bold">{t('req transactions')}</p>
        {transformedActions
          .filter((action) => action.chainId)
          .map((action, index) => (
            <RequiredTransaction
              key={`${action.id}-${index}`}
              chainId={action.chainId}
              transactions={action.type === EFPActionType.UpdateEFPList ? listOpActions.length : undefined}
            />
          ))}
      </div>
      <div className="flex w-full gap-8 mt-2 justify-between">
        <CancelButton
          onClick={() => {
            if (actions[0]?.label === 'create list') {
              setCurrentStep(Step.SelectChain)
              return
            }

            onCancel()
          }}
          className="bg-[#cccccc]"
        />
        <PrimaryButton
          label={t(isCorrectChain ? 'initiate' : 'switch chain')}
          onClick={handleInitiateActions}
          className="text-lg w-auto px-4 min-w-32"
        />
      </div>
    </>
  )
}

export default InitiateActionsCard
