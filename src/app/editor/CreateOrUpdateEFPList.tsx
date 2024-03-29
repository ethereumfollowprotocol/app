import { PrimaryButton } from '#/components/primary-button'
import type { ChainWithDetails } from '#/lib/wagmi'
import { CheckIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Heading, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import { useState } from 'react'
import { useChains } from 'wagmi'

enum Step {
  SelectChain = 'SelectChain',
  InitiateTransactions = 'InitiateTransactions',
  TransationStatus = 'TransationStatus'
}

export function CreateOrUpdateEFPList() {
  const chains = useChains() as unknown as ChainWithDetails[]
  const [selectedChain, setSelectedChain] = useState<ChainWithDetails | null>(null)
  const [currentStep, setCurrentStep] = useState(Step.SelectChain)

  const handleChainClick = (chain: ChainWithDetails) => {
    setSelectedChain(chain)
  }

  const handleNextStep = () => {
    if (!selectedChain) return
    setCurrentStep(Step.InitiateTransactions)
  }

  return (
    <Box className='flex flex-col items-center text-center justify-between h-full'>
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
  setCurrentStep,
  selectedChain,
  handleInitiateTransactions
}: {
  setCurrentStep: (step: Step) => void
  selectedChain: ChainWithDetails | null
  handleInitiateTransactions: () => void
}) {
  return (
    <Box className='w-full h-full'>
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
        <Box className='actions'>
          <Box>something</Box>
          <Box>something else</Box>
        </Box>
      </Box>
      <Box className='required transactions'>
        <Box>1 tx on ethereum</Box>
        <Box>1 tx on optimism</Box>
      </Box>
      <Box className='flex justify-between'>
        <PrimaryButton
          label='Back'
          onClick={() => setCurrentStep(Step.SelectChain)}
          className='text-lg w-40 h-10'
        />
        <PrimaryButton
          label='Initiate'
          onClick={handleInitiateTransactions}
          className='text-lg w-40 h-10'
          disabled={!selectedChain}
        />
      </Box>
    </Box>
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
