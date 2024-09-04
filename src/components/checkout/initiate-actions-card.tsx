import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Step } from './types'
import useChain from '#/hooks/use-chain'
import { useCart } from '#/contexts/cart-context'
import { ChainIcon } from '#/components/chain-icon'
import CancelButton from '#/components/buttons/cancel-button'
import { DEFAULT_CHAIN } from '#/lib/constants/chain'
import { PrimaryButton } from '#/components/buttons/primary-button'
import { EFPActionType, type Action } from '#/contexts/actions-context'

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
  handleInitiateActions
}) => {
  const { totalCartItems } = useCart()
  const { t } = useTranslation()

  const listOpActions = actions.filter(action => action.type === EFPActionType.UpdateEFPList)
  const transformedActions = useMemo(() => {
    const cartActions = actions.filter(action => action.type === EFPActionType.UpdateEFPList)
    const otherActions = actions.filter(action => action.type !== EFPActionType.UpdateEFPList)

    const totalCartAction = {
      id: `${EFPActionType.UpdateEFPList}`, // Unique identifier for the action
      type: EFPActionType.UpdateEFPList,
      label: cartActions[0]?.label.includes('Transfer List State')
        ? 'Transfer List State'
        : `${totalCartItems} ${t('list ops')}`,
      chainId: cartActions[0]?.chainId || DEFAULT_CHAIN.id,
      execute: cartActions[0]?.execute,
      isPendingConfirmation: false
    }

    return cartActions.length === 0 ? [...otherActions] : [totalCartAction, ...otherActions]
  }, [actions])

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl sm:text-3xl font-bold'>{t('action title')}</h1>
        <p className='text-lg'>{t('summary')}</p>
      </div>
      <div className='flex flex-col items-center gap-4 sm:gap-6'>
        <p className='text-xl sm:text-2xl font-bold'>{t('actions')}</p>
        <div>
          {transformedActions
            .filter(action => action.chainId)
            .map((action, index) => (
              <div className='flex flex-col items-center' key={`${action.id}-${index}`}>
                {/* <CheckIcon className='left-0 text-lime-500 relative -ml-12 w-10 h-10' /> */}
                <div className='flex items-center gap-2'>
                  <p className='font-bold'>
                    {action.label === 'create list' ? t(action.label) : action.label}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='flex flex-col gap-2 items-center'>
        <p className='text-center text-xl font-bold'>{t('req transactions')}</p>
        {transformedActions
          .filter(action => action.chainId)
          .map((action, index) => (
            <RequiredTransaction
              key={`${action.id}-${index}`}
              chainId={action.chainId}
              transactions={
                action.type === EFPActionType.UpdateEFPList ? listOpActions.length : undefined
              }
            />
          ))}
      </div>
      <div className='flex w-full gap-8 mt-4 justify-between'>
        <CancelButton
          onClick={() => {
            if (actions[0]?.label === 'create list') {
              setCurrentStep(Step.SelectChain)
              return
            }

            onCancel()
          }}
          className='bg-[#cccccc]'
        />
        <PrimaryButton
          label={t('initiate')}
          onClick={handleInitiateActions}
          className='text-lg w-auto px-4 min-w-32'
        />
      </div>
    </>
  )
}

const RequiredTransaction = ({
  chainId,
  transactions = 1
}: { chainId: number; transactions?: number }) => {
  const chain = useChain(chainId)

  if (!chain) return null

  return (
    <div className='grid grid-cols-2 items-center justify-items-center gap-2'>
      <div className='flex items-center gap-2'>
        <p className='font-bold'>{transactions} tx</p>
        <ChainIcon chain={chain} className='h-[30px] w-[30px]' />
      </div>
      <p className='justify-self-start'>{chain.name}</p>
    </div>
  )
}

export default InitiateActionsCard
