import { Box, Heading, Text } from '@radix-ui/themes'
import { useCallback } from 'react'
import { ChainIcon } from '#/components/chain-icon'
import { PrimaryButton } from '#/components/primary-button'
import { useWaitForTransactionReceipt } from 'wagmi'
import clsx from 'clsx'
import { useActions, type Action } from '#/contexts/actions-context'
import useChain from '#/hooks/use-chain'
import { useCart } from '#/contexts/cart-context'

interface TransactionStatusCardProps {
  setOpen?: (open: boolean) => void // setOpen prop for the parent modal
}

/**
 * @description Component for displaying the status of an onchain transaction
 * and the details of the action being executed
 *
 * The component also provides a button to move to the next action, using the actions-context
 */
export function TransactionStatusCard({ setOpen }: TransactionStatusCardProps) {
  const {
    actions,
    allActionsSuccessful,
    currentAction,
    currentActionIndex,
    executeActionByIndex,
    moveToNextAction,
    resetActions
  } = useActions()
  const chain = useChain(currentAction?.chainId)
  const { resetCart } = useCart()
  const { isSuccess } = useWaitForTransactionReceipt({
    hash: currentAction?.txHash,
    chainId: currentAction?.chainId
  })

  const handleNextAction = useCallback(() => {
    const nextActionIndex = moveToNextAction()
    executeActionByIndex(nextActionIndex)
  }, [moveToNextAction, executeActionByIndex])

  const handleFinish = useCallback(() => {
    // Close the modal
    setOpen?.(false)
    // Reset the actions
    resetActions()
    // Reset the cart
    resetCart()
  }, [setOpen, resetActions, resetCart])

  // Disable the next button if the current action is not successful
  const nextButtonIsDisabled = !isSuccess
  // Disable the finish button if not all actions are successful
  const finishButtonIsDisabled = !allActionsSuccessful

  const showNextButton = !allActionsSuccessful
  const showFinishButton = allActionsSuccessful

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
      {chain && (
        <Box className='flex flex-col gap-2'>
          <Text size='4' weight='bold'>
            Chain
          </Text>
          <Box className='flex items-center gap-2'>
            <ChainIcon chain={chain} className='w-[30px] h-[30px]' />
            <Text size='3' weight='bold'>
              {chain.name}
            </Text>
          </Box>
        </Box>
      )}
      <TransactionStatusDetails action={currentAction} />
      {showNextButton && (
        <PrimaryButton
          label={'Next'}
          onClick={handleNextAction}
          className='text-lg w-40 h-10'
          disabled={nextButtonIsDisabled}
        />
      )}
      {showFinishButton && (
        <PrimaryButton
          label={'Finish'}
          onClick={handleFinish}
          className='text-lg w-40 h-10'
          disabled={finishButtonIsDisabled}
        />
      )}
    </>
  )
}

function TransactionStatusDetails({ action }: { action: Action }) {
  const chain = useChain(action.chainId)

  const { isPending, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: action.txHash,
    chainId: action.chainId
  })

  const getStatusDescription = useCallback(() => {
    if (action.isPendingConfirmation) return 'Transaction needs approval'
    if (isPending) return 'Transaction pending...'
    if (isSuccess) return 'Transaction approved'
    if (isError) return 'Transaction error'
  }, [action.isPendingConfirmation, isPending, isSuccess, isError])

  const getStatusColor = useCallback(() => {
    if (action.isPendingConfirmation) return 'text-salmon-500'
    if (isPending) return 'text-kournikova-600'
    if (isSuccess) return 'text-lime-600'
    if (isError) return 'text-red-600'
  }, [action.isPendingConfirmation, isPending, isSuccess, isError])

  const shouldShowComponent = isPending || isSuccess || isError || action.isPendingConfirmation

  const explorerUrl = `${chain?.blockExplorers?.default.url}/tx/${action.txHash}`

  return shouldShowComponent ? (
    <Box className='flex flex-col'>
      <Text size='7' weight='bold'>
        Status
      </Text>
      <Text size='2' className={clsx(getStatusColor(), 'font-bold')}>
        {getStatusDescription()}
      </Text>
      {action.isPendingConfirmation ? (
        <Text size='2' className='text-gray-500 font-bold'>
          Check your wallet
        </Text>
      ) : (
        <a
          href={explorerUrl}
          target='_blank'
          rel='noreferrer'
          className='text-sm font-bold text-blue-600'
        >
          View on Block Explorer
        </a>
      )}
    </Box>
  ) : null
}
