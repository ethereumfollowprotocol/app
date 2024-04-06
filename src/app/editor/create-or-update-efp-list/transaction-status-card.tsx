import { Box, Heading, Text } from '@radix-ui/themes'
import { useState } from 'react'
import type { Action } from './types'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import { useWaitForTransactionReceipt } from 'wagmi'

export function TransactionStatusCard({ actions }: { actions: Action[] }) {
  const [currentAction, setCurrentAction] = useState(() => actions[0]) // TODO might need to validate this: to bundle in a way that handles creating an EFP list first
  const currentActionIndex = currentAction ? actions.indexOf(currentAction) + 1 : null

  if (!currentAction) return null

  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Heading as='h1' size='6'>
          Onchain Update
        </Heading>
        {currentActionIndex && (
          <Text as='p' size='2' weight='bold'>
            {currentActionIndex} of {actions.length}
          </Text>
        )}
      </Box>
      <Box className='flex flex-col gap-4'>
        <Text size='5' weight='bold'>
          Action
        </Text>
        <Text size='2' weight='bold'>
          {currentAction.label}
        </Text>
      </Box>
      {currentAction.chain && (
        <Box className='flex flex-col gap-2'>
          <Text size='5' weight='bold'>
            Chain
          </Text>
          <Box className='flex items-center gap-2'>
            <ChainIcon chain={currentAction.chain} className='w-[30px] h-[30px]' />
            <Text size='3' weight='bold'>
              {currentAction.chain.name}
            </Text>
          </Box>
        </Box>
      )}
      <TransactionPendingConfirmation />
      <TransactionStatusDetails hash={currentAction.txHash} />
      <PrimaryButton
        label='Next'
        onClick={() => console.log('need to initiate next transaction')}
        className='text-lg w-40 h-10'
        disabled={false}
      />
    </>
  )
}

function TransactionStatusDetails({ hash }: { hash: `0x${string}` }) {
  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: currentAction?.txHash,
    chainId: currentAction?.chain?.id
  })
}
