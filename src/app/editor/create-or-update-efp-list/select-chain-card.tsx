import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import type { ChainWithDetails } from '#/lib/wagmi'
import { CheckIcon } from '@radix-ui/react-icons'
import { Box, Heading, Text } from '@radix-ui/themes'

export function SelectChainCard({
  chains,
  handleChainClick,
  selectedChain,
  handleNextStep
}: {
  chains: ChainWithDetails[]
  handleChainClick: (chain: ChainWithDetails) => void
  selectedChain: ChainWithDetails | null
  handleNextStep: () => void
}) {
  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Heading as='h1' size='6'>
          Where would you like to store you EFP list?
        </Heading>
        <Text as='p' size='2'>
          You can always change this later
        </Text>
      </Box>

      <Box className='flex flex-col gap-6'>
        <Text size='5' weight='bold'>
          Select one
        </Text>
        <ChainList chains={chains} onClick={handleChainClick} selectedChain={selectedChain} />
      </Box>
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
  onClick: (chain: ChainWithDetails) => void
  selectedChain: ChainWithDetails | null
}) {
  return (
    <Box className='flex flex-col gap-4'>
      {chains.map(chain => (
        <Chain
          chain={chain}
          onClick={onClick}
          isSelected={chain === selectedChain}
          key={chain.id}
        />
      ))}
    </Box>
  )
}

function Chain({
  chain,
  onClick,
  isSelected
}: { chain: ChainWithDetails; onClick: (chain: ChainWithDetails) => void; isSelected: boolean }) {
  return (
    <Box className='flex items-center gap-2 hover:cursor-pointer' onClick={() => onClick(chain)}>
      <Box>
        {isSelected && <CheckIcon className='left-0 text-lime-500 relative -ml-12 w-10 h-10' />}
      </Box>
      <ChainIcon chain={chain} className={'h-[60px] w-[60px]'} />
      <Box className='flex flex-col items-start '>
        <Text size='1'>{chain.custom.chainDetail}</Text>
        <Text size='2' weight='bold'>
          {chain.name}
        </Text>
        <Text size='1'>{chain.custom.gasFeeDetail}</Text>
      </Box>
    </Box>
  )
}
