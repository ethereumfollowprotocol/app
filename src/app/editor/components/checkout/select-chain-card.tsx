import Image from 'next/image'
import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { optimismSepolia, type Chain } from 'viem/chains'
import { useChainId, useSwitchChain, type Config, type UseChainsReturnType } from 'wagmi'

import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import CancelButton from '#/components/cancel-button'
import { PrimaryButton } from '#/components/primary-button'
import GreenCheck from 'public/assets/icons/check-green.svg'

export function SelectChainCard({
  chains,
  isCreatingNewList,
  onCancel,
  handleChainClick,
  selectedChain,
  handleNextStep
}: {
  chains: UseChainsReturnType<Config>
  isCreatingNewList: boolean
  onCancel: () => void
  handleChainClick: (chainId: number) => void
  selectedChain: ChainWithDetails | undefined
  handleNextStep: () => void
}) {
  const currentChainId = useChainId()
  const { switchChain } = useSwitchChain()

  const { t } = useTranslation('transactions')
  const { t: tChain } = useTranslation('transactions', { keyPrefix: 'select chain' })

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl sm:text-3xl font-semibold'>
          {tChain(isCreatingNewList ? 'title create list' : 'title list op')}
        </h1>
        {isCreatingNewList && <p className=' font-medium text-gray-400'>{tChain('comment')}</p>}
      </div>
      <div className='flex flex-col items-center gap-4 sm:gap-6'>
        <p className='text-xl sm:text-2xl font-bold'>{tChain('select')}</p>
        <ChainList
          chains={chains}
          onClick={handleChainClick}
          translations={tChain}
          selectedChain={selectedChain}
        />
      </div>
      <div className='w-full mt-10 flex justify-between items-center'>
        <CancelButton onClick={onCancel} />
        <PrimaryButton
          label={t('next')}
          onClick={() => {
            if (!selectedChain) return
            if (currentChainId !== optimismSepolia.id) switchChain({ chainId: optimismSepolia.id })
            handleNextStep()
          }}
          className='text-lg w-32 h-12'
          disabled={!selectedChain}
        />
      </div>
    </>
  )
}

export function ChainList({
  chains,
  onClick,
  translations,
  selectedChain
}: {
  chains: UseChainsReturnType<Config>
  onClick: (chainId: number) => void
  translations: TFunction<'transactions', 'select chain'>
  selectedChain: ChainWithDetails | undefined
}) {
  return (
    <div className='flex flex-col gap-4'>
      {chains.map(chain => (
        <ChainItem
          key={chain.id}
          chain={chain}
          onClick={onClick}
          translations={translations}
          isSelected={chain.id === selectedChain?.id}
        />
      ))}
    </div>
  )
}

function ChainItem({
  chain,
  onClick,
  isSelected,
  translations
}: {
  isSelected: boolean
  chain: Chain
  onClick: (chainId: number) => void
  translations: TFunction<'transactions', 'select chain'>
}) {
  return (
    <div
      className='flex items-center relative gap-2 hover:cursor-pointer'
      onClick={() => onClick(chain.id)}
    >
      {isSelected && (
        <Image
          src={GreenCheck}
          alt='selected'
          height={32}
          width={32}
          className='absolute left-0 text-lime-500 -ml-8 sm:-ml-12'
        />
      )}
      <ChainIcon chain={chain as ChainWithDetails} className={'h-[60px] w-[60px]'} />
      <div className='flex flex-col items-start '>
        <p>{chain?.custom?.chainDetail as string}</p>
        <p className='text-lg font-bold'>{chain.name}</p>
        <p>{translations(chain?.custom?.gasFeeDetail as string)}</p>
      </div>
    </div>
  )
}
