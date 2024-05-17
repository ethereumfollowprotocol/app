import type { ChainWithDetails } from '#/lib/wagmi'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'

export function SelectChainCard({
  chains,
  handleChainClick,
  selectedChain,
  handleNextStep
}: {
  chains: ChainWithDetails[]
  handleChainClick: (chainId: number) => void
  selectedChain: ChainWithDetails | undefined
  handleNextStep: () => void
}) {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl'>Where would you like to store you EFP list?</h1>
        <p className='lg'>You can always change this later</p>
      </div>

      <div className='flex flex-col gap-6'>
        <p className='text-2xl font-bold'>Select one</p>
        <ChainList chains={chains} onClick={handleChainClick} selectedChain={selectedChain} />
      </div>
      <PrimaryButton
        label='Next'
        onClick={handleNextStep}
        className='text-lg w-40 h-10'
        disabled={!selectedChain}
      />
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
    <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => onClick(chain.id)}>
      {/* <div>
        {isSelected && <CheckIcon className='left-0 text-lime-500 relative -ml-12 w-10 h-10' />}
      </div> */}
      <ChainIcon chain={chain} className={'h-[60px] w-[60px]'} />
      <div className='flex flex-col items-start '>
        <p>{chain.custom.chainDetail}</p>
        <p className='text-lg font-bold'>{chain.name}</p>
        <p>{chain.custom.gasFeeDetail}</p>
      </div>
    </div>
  )
}
