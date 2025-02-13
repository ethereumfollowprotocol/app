import type { Chain } from 'viem/chains'
import { useTranslation } from 'react-i18next'
import { useChainId, useSwitchChain, type Config, type UseChainsReturnType } from 'wagmi'

import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import { DEFAULT_CHAIN } from '#/lib/constants/chains'
import Check from 'public/assets/icons/ui/check.svg'
import CancelButton from '#/components/buttons/cancel-button'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import PrimaryButton from '#/components/buttons/primary-button'

export function SelectChainCard({
  chains,
  isCreatingNewList,
  onCancel,
  handleChainClick,
  selectedChain,
  handleNextStep,
  setNewListAsPrimary,
  setSetNewListAsPrimary,
}: {
  chains: UseChainsReturnType<Config>
  isCreatingNewList: boolean
  onCancel: () => void
  handleChainClick: (chainId: number) => void
  selectedChain: ChainWithDetails | undefined
  handleNextStep: () => void
  setNewListAsPrimary: boolean
  setSetNewListAsPrimary: (state: boolean) => void
}) {
  const { t } = useTranslation()
  const { lists } = useEFPProfile()
  const currentChainId = useChainId()
  const { switchChain } = useSwitchChain()

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>{t(isCreatingNewList ? 'create list title' : 'title list op')}</h1>
        {isCreatingNewList && <p className='font-medium text-zinc-400'>{t('chain comment')}</p>}
      </div>
      <div className='flex flex-col items-center gap-4'>
        <p className='text-xl font-bold'>{t('select')}</p>
        <ChainList chains={chains} onClick={handleChainClick} selectedChain={selectedChain} />
      </div>
      {lists?.lists && lists.lists.length > 0 && (
        <div className='mt-4 flex items-center gap-3 sm:gap-5'>
          <p className='text-lg font-bold'>{t('set new primary')}</p>
          <input
            className='toggle'
            type='checkbox'
            defaultChecked={setNewListAsPrimary}
            onChange={(e) => setSetNewListAsPrimary(e.target.checked)}
          />
        </div>
      )}
      <div className='mt-6 flex w-full items-center justify-between'>
        <CancelButton className='h-14' onClick={onCancel} />
        <PrimaryButton
          label={t('next')}
          onClick={() => {
            if (!selectedChain) return
            if (currentChainId !== DEFAULT_CHAIN.id) switchChain({ chainId: DEFAULT_CHAIN.id })
            handleNextStep()
          }}
          className='w-32 text-lg'
          disabled={!selectedChain}
        />
      </div>
    </>
  )
}

export function ChainList({
  chains,
  onClick,
  selectedChain,
}: {
  chains: UseChainsReturnType<Config>
  onClick: (chainId: number) => void
  selectedChain: ChainWithDetails | undefined
}) {
  return (
    <div className='flex flex-col gap-4'>
      {chains.map((chain) => (
        <ChainItem key={chain.id} chain={chain} onClick={onClick} isSelected={chain.id === selectedChain?.id} />
      ))}
    </div>
  )
}

function ChainItem({
  chain,
  onClick,
  isSelected,
}: {
  isSelected: boolean
  chain: Chain
  onClick: (chainId: number) => void
}) {
  const { t } = useTranslation()

  return (
    <div className='relative flex items-center gap-3 hover:cursor-pointer' onClick={() => onClick(chain.id)}>
      {isSelected && <Check className='absolute left-0 -ml-8 text-green-500 sm:-ml-12' />}
      <ChainIcon chain={chain as ChainWithDetails} className={'h-[50px] w-[50px]'} />
      <div className='flex flex-col items-start'>
        <p className='text-sm'>{chain?.custom?.chainDetail as string}</p>
        <p className='font-bold'>{chain.name}</p>
        <p className='text-sm'>{t(chain?.custom?.gasFeeDetail as string)}</p>
      </div>
    </div>
  )
}
