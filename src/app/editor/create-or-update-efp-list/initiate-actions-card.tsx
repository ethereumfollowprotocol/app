import type { ChainWithDetails } from '#/lib/wagmi'
import { Box, Heading, Text } from '@radix-ui/themes'
import { Step, type Action } from './types'
import { CheckIcon } from '@radix-ui/react-icons'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'

export function InitiateActionsCard({
  actions,
  setCurrentStep,
  selectedChain,
  handleInitiateActions
}: {
  actions: Action[]
  setCurrentStep: (step: Step) => void
  selectedChain: ChainWithDetails | null
  handleInitiateActions: () => void
}) {
  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Heading as='h1' size='6'>
          Onchain Update
        </Heading>
        <Text as='p' size='2'>
          Summary
        </Text>
      </Box>
      <Box className='flex flex-col gap-6'>
        <Text size='5' weight='bold'>
          Actions
        </Text>
        <Box>
          {actions.map(
            (action, index) =>
              action.chain && (
                <Box className='flex' key={`${action.chain.id}-${index}`}>
                  <CheckIcon className='left-0 text-lime-500 relative -ml-12 w-10 h-10' />
                  <Box className='flex items-center gap-2'>
                    <Text weight='bold'>{action.label}</Text>
                  </Box>
                </Box>
              )
          )}
        </Box>
      </Box>
      <Box className='flex flex-col gap-2 items-center'>
        <Text size='5' weight='bold' className='text-center'>
          Required Transactions
        </Text>
        {actions.map((action, index) =>
          action.chain ? (
            <Box
              key={`${action.chain.id}-${index}`}
              className='grid grid-cols-2 items-center justify-items-center gap-2'
            >
              <Box className='flex items-center gap-2'>
                <Text weight='bold' className=''>
                  1 tx
                </Text>
                <ChainIcon chain={action.chain} className='h-[30px] w-[30px]' />
              </Box>
              <Text className='justify-self-start'>{action.chain.name}</Text>
            </Box>
          ) : null
        )}
      </Box>
      <Box className='flex w-full justify-between'>
        <PrimaryButton
          label='Back'
          onClick={() => setCurrentStep(Step.SelectChain)}
          className='text-lg w-40 h-10 bg-grey'
        />
        <PrimaryButton
          label='Initiate'
          onClick={handleInitiateActions}
          className='text-lg w-40 h-10'
          disabled={!selectedChain}
        />
      </Box>
    </>
  )
}
