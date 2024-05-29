import Image from 'next/image'
import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import GreenCheck from 'public/assets/icons/check-green.svg'
import CancelButton from '#/components/cancel-button'

export function SelectChainCard({
  chains,
  onCancel,
  handleChainClick,
  selectedChain,
  handleNextStep
}: {
  chains: ChainWithDetails[]
  onCancel: () => void
  handleChainClick: (chainId: number) => void
  selectedChain: ChainWithDetails | undefined
  handleNextStep: () => void
}) {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold'>Where would you like to store you EFP list?</h1>
        <p className=' font-medium text-gray-400'>You can always change this later</p>
      </div>

      <div className='flex flex-col gap-6'>
        <p className='text-2xl font-bold'>Select one</p>
        <ChainList chains={chains} onClick={handleChainClick} selectedChain={selectedChain} />
      </div>
      <div className='w-full mt-10 flex justify-between items-center'>
        <CancelButton onClick={onCancel} />
        <PrimaryButton
          label='Next'
          onClick={handleNextStep}
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
  selectedChain
}: {
  chains: ChainWithDetails[]
  onClick: (chainId: number) => void
  selectedChain: ChainWithDetails | undefined
}) {
  return (
    <div className='flex flex-col gap-4'>
      {chains.map(chain => (
        <Chain
          chain={chain}
          onClick={onClick}
          isSelected={chain.id === selectedChain?.id}
          key={chain.id}
        />
      ))}
    </div>
  )
}

function Chain({
  chain,
  onClick,
  isSelected
}: { chain: ChainWithDetails; onClick: (chainId: number) => void; isSelected: boolean }) {
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
          className=' absolute left-0 text-lime-500 -ml-12'
        />
      )}
      <ChainIcon chain={chain} className={'h-[60px] w-[60px]'} />
      <div className='flex flex-col items-start '>
        <p>{chain.custom.chainDetail}</p>
        <p className='text-lg font-bold'>{chain.name}</p>
        <p>{chain.custom.gasFeeDetail}</p>
      </div>
    </div>
  )
}
