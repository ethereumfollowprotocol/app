import type { ChainWithDetails } from '#/lib/wagmi'
import { Avatar, Box, Heading, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import { useChains } from 'wagmi'

export function CreateOrUpdateEFPList() {
  const chains = useChains() as unknown as ChainWithDetails[]
  return (
    <Box className='flex flex-col items-center text-center gap-4'>
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
        <ChainList chains={chains} />
      </Box>
    </Box>
  )
}

export function ChainList({ chains }: { chains: ChainWithDetails[] }) {
  return (
    <Box className='flex flex-col gap-4'>
      {chains.map(chain => (
        <Chain chain={chain} />
      ))}
    </Box>
  )
}

function Chain({ chain }: { chain: ChainWithDetails }) {
  return (
    <Box className='flex items-center gap-2'>
      <Avatar
        src={chain.iconUrl}
        fallback={'/assets/chains/ethereum.svg'}
        radius='full'
        className={clsx(chain.iconBackground, 'h-[60px] w-[60px]')}
      />
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
