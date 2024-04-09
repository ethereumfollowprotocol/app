import { Box, Heading, Text } from '@radix-ui/themes'
import { useCallback } from 'react'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import { useWaitForTransactionReceipt } from 'wagmi'
import clsx from 'clsx'
import { useActions, type Action } from '#/contexts/actions-context'

export function TransactionStatusCard() {
  const { currentAction, currentActionIndex, actions } = useActions()

  if (!currentAction) return null

  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Heading as='h1' size='6'>
          Onchain Update
        </Heading>

        <Text as='p' size='2' weight='bold'>
          {currentActionIndex + 1} of {actions.length}
        </Text>
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
          <Text size='4' weight='bold'>
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
      <TransactionStatusDetails action={currentAction} />
      <PrimaryButton
        label='Next'
        onClick={() => console.log('need to initiate next transaction')}
        className='text-lg w-40 h-10'
        disabled={currentAction.isConfirmationError}
      />
    </>
  )
}

function TransactionStatusDetails({ action }: { action: Action }) {
  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: action.txHash,
    chainId: action.chain?.id
  })

  const getStatusDescription = useCallback(() => {
    if (action.isPendingConfirmation) return 'Transaction needs approval'
    if (isPending) return 'Transaction pending...'
    if (isSuccess) return 'Transaction approved'
    if (isError) return 'Transaction error'
  }, [action.isPendingConfirmation, isPending, isSuccess, isError])

  const getStatusColor = useCallback(() => {
    if (action.isPendingConfirmation) return 'text-salmon-500'
    if (isPending) return 'text-kournikova-500'
    if (isSuccess) return 'text-lime-500'
    if (isError) return 'text-red-500'
  }, [action.isPendingConfirmation, isPending, isSuccess, isError])

  const shouldShowComponent = isPending || isSuccess || isError

  return shouldShowComponent ? (
    <Box className='flex flex-col'>
      <Text size='7' weight='bold'>
        Status
      </Text>
      <Text size='2' className={clsx(getStatusColor())}>
        {getStatusDescription()}
      </Text>
      {action.isPendingConfirmation ? (
        <Text size='2' className='text-gray-500'>
          Check your wallet
        </Text>
      ) : (
        <a href={action.chain?.blockExplorers?.default.url} target='_blank' rel='noreferrer'>
          View on Block Explorer
        </a>
      )}
    </Box>
  ) : null
}
