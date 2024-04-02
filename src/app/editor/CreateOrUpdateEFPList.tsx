import { PrimaryButton } from '#/components/primary-button'
import { useCart } from '#/contexts/cart-context'
import type { ChainWithDetails } from '#/lib/wagmi'
import { CheckIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Heading, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { mainnet } from 'viem/chains'
import { useChains } from 'wagmi'

enum Step {
  SelectChain = 'SelectChain',
  InitiateTransactions = 'InitiateTransactions',
  TransationStatus = 'TransationStatus'
}

type Action = {
  label: string
  chain: ChainWithDetails | null | undefined
}

export function CreateOrUpdateEFPList() {
  const hasCreatedEfpList = false // TODO get this from context or fetch this
  const { totalCartItems } = useCart()

  const chains = useChains() as unknown as ChainWithDetails[] // TODO fix this cast as unknown
  const [selectedChain, setSelectedChain] = useState<ChainWithDetails | null>(null)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  // Cart item action
  const cartItemActionLabel = `${totalCartItems} edit${
    totalCartItems > 1 ? 's' : ''
  } to List Records`
  const cartItemAction = { label: cartItemActionLabel, chain: selectedChain }

  // Create EFP List action
  const CREATE_EFP_LIST_ACTION = {
    label: 'Create new EFP List',
    chain: chains.find(chain => chain.id === 1) // Mainnet
  }

  const actions = useMemo<Action[]>(
    () => (hasCreatedEfpList ? [cartItemAction] : [CREATE_EFP_LIST_ACTION, cartItemAction]),
    [cartItemAction, CREATE_EFP_LIST_ACTION]
  )

  const handleChainClick = (chain: ChainWithDetails) => {
    setSelectedChain(chain)
  }

  const handleNextStep = () => {
    if (!selectedChain) return
    setCurrentStep(Step.InitiateTransactions)
  }

  return (
    <Box className='flex flex-col items-center text-center justify-between h-full w-full'>
      {currentStep === Step.SelectChain && (
        <SelectChain
          chains={chains}
          handleChainClick={handleChainClick}
          selectedChain={selectedChain}
          handleNextStep={handleNextStep}
        />
      )}
      {currentStep === Step.InitiateTransactions && (
        <InitiateTransactions
          setCurrentStep={setCurrentStep}
          selectedChain={selectedChain}
          handleInitiateTransactions={() => setCurrentStep(Step.TransationStatus)}
          actions={actions}
        />
      )}
      {currentStep === Step.TransationStatus && <TransactionStatus />}
    </Box>
  )
}

function SelectChain({
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

function InitiateTransactions({
  actions,
  setCurrentStep,
  selectedChain,
  handleInitiateTransactions
}: {
  actions: Action[]
  setCurrentStep: (step: Step) => void
  selectedChain: ChainWithDetails | null
  handleInitiateTransactions: () => void
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
            action =>
              action.chain && (
                <Box className='flex'>
                  <CheckIcon className='left-0 text-lime-500 relative -ml-12 w-10 h-10' />
                  <Box key={action.chain.id} className='flex items-center gap-2'>
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
        {actions.map(action =>
          action.chain ? (
            <Box
              key={action.chain.id}
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
          onClick={handleInitiateTransactions}
          className='text-lg w-40 h-10'
          disabled={!selectedChain}
        />
      </Box>
    </>
  )
}

function TransactionStatus() {
  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Heading as='h1' size='6'>
          Transaction Status
        </Heading>
        <Text as='p' size='2'>
          blah
        </Text>
      </Box>
      <PrimaryButton
        label='Next'
        onClick={() => console.log('need to initiate next transaction')}
        className='text-lg w-40 h-10'
        disabled={false}
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

function ChainIcon({ chain, className }: { chain: ChainWithDetails; className?: string }) {
  return (
    <Avatar
      src={chain.iconUrl}
      fallback={'/assets/chains/ethereum.svg'}
      radius='full'
      className={clsx(chain.iconBackground, className)}
    />
  )
}
