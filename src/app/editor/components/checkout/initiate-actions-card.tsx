import type { ChainWithDetails } from '#/lib/wagmi'
import { Step } from './types'
import useChain from '#/hooks/use-chain'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import type { Action } from '#/contexts/actions-context'
import CancelButton from '#/components/cancel-button'
import { useTranslation } from 'react-i18next'
import { useChainId } from 'wagmi'

export function InitiateActionsCard({
  actions,
  setCurrentStep,
  selectedChain,
  handleInitiateActions
}: {
  actions: Action[]
  setCurrentStep: (step: Step) => void
  selectedChain: ChainWithDetails | undefined
  handleInitiateActions: () => void
}) {
  const currentChainId = useChainId()
  const { t: tBtn } = useTranslation('transactions')
  const { t } = useTranslation('transactions', { keyPrefix: 'action' })

  const isCorrectChainSelected = currentChainId === selectedChain?.id

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl sm:text-3xl font-semibold'>{t('title')}</h1>
        <p className='text-lg'>{t('summary')}</p>
      </div>
      <div className='flex flex-col items-center gap-4 sm:gap-6'>
        <p className='text-xl sm:text-2xl font-bold'>{t('actions')}</p>
        <div>
          {actions
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
        {actions
          .filter(action => action.chainId)
          .map((action, index) => (
            <RequiredTransaction key={`${action.id}-${index}`} chainId={action.chainId} />
          ))}
      </div>
      <div className='flex w-full gap-8 mt-4 justify-between'>
        <CancelButton onClick={() => setCurrentStep(Step.SelectChain)} />
        <PrimaryButton
          label={isCorrectChainSelected ? tBtn('initiate') : tBtn('network')}
          onClick={handleInitiateActions}
          className='text-lg w-auto px-4 min-w-32 h-12'
          disabled={!selectedChain}
        />
      </div>
    </>
  )
}

const RequiredTransaction = ({ chainId }: { chainId: number }) => {
  const chain = useChain(chainId)

  if (!chain) return null

  return (
    <div className='grid grid-cols-2 items-center justify-items-center gap-2'>
      <div className='flex items-center gap-2'>
        <p className='font-bold'>1 tx</p>
        <ChainIcon chain={chain} className='h-[30px] w-[30px]' />
      </div>
      <p className='justify-self-start'>{chain.name}</p>
    </div>
  )
}
