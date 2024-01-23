'use client'

import { useIsMounted } from '#/hooks/use-is-mounted.ts'
import { useMintEFP } from '#/hooks/use-mint-efp.ts'
import { SECOND } from '#/lib/constants'
import '#/lib/patch.ts'
import { truncateAddress } from '#/lib/utilities'
import { Badge, Box, Button, Card, Code, Flex, Heading, Text } from '@radix-ui/themes'
import clsx from 'clsx'
import { useQueryState } from 'next-usequerystate'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'

export function CreateEfpList() {
  const {
    writeMintData: hash,
    writeMint: writeContract,
    simulateMintStatus,
    simulateMintData,
    writeMintStatus,
    writeMintError
  } = useMintEFP()

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!simulateMintData?.request) return
    writeContract(simulateMintData.request)
  }

  const isPending = simulateMintStatus === 'pending' || writeMintStatus === 'pending'

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data
  } = useWaitForTransactionReceipt({
    hash
  })

  return (
    <div>
      <form onSubmit={submit}>
        <button disabled={isPending} type='submit'>
          {isPending ? 'Confirming...' : 'Mint'}
        </button>
      </form>
      {hash && <p>Transaction hash: {truncateAddress(hash)}</p>}
      {isConfirming && <p>Transaction is confirming...</p>}
      {isConfirmed && <p>Transaction is confirmed!</p>}
      {writeMintError && <p>{writeMintError.message}</p>}
    </div>
  )
}

/**
 * Steps
 * 1. Select where to store EFP List: Ethereum or Optimism,
 * 2. Show confirmation step summarizing what's about to happen, cost, and a button to initiate,
 * 3. Tell user transaction needs approval,
 * 4. Show pending transaction with view on Etherscan,
 * 5. Show success message with link to EFP List,
 */

export const storeLocation = [
  {
    chainId: 1,
    name: 'ethereum',
    label: undefined,
    gas: 'High gas fees',
    image: '/assets/onboarding/ethereum.svg'
  },
  {
    chainId: 10,
    name: 'optimism',
    label: 'Ethereum L2',
    gas: 'Low gas fees',
    image: '/assets/chains/optimism.svg'
  }
] as const

const steps = {
  '0': {
    title: 'Where would you like to store your EFP List?',
    subtext: 'You can always change this later',
    leftButton: 'Cancel',
    rightButton: 'Next'
  },
  '1': {
    title: 'Onchain update',
    subtext: 'Summary',
    leftButton: 'Back',
    rightButton: 'Initiate'
  },
  '2': {
    title: 'Onchain update',
    subtext: '',
    leftButton: 'Cancel',
    rightButton: 'Retry'
  },
  '3': {
    title: 'Transaction pending',
    subtext: 'You can always change this later',
    leftButton: 'Back',
    rightButton: 'View on Etherscan'
  }
} satisfies Record<
  '0' | '1' | '2' | '3',
  { title: string; subtext: string; leftButton: string; rightButton: string }
>

export function CreateNewListForm() {
  const isMounted = useIsMounted()
  const {
    writeMint,
    writeMintAsync,
    writeMintData: hash,
    simulateMintStatus,
    writeMintStatus,
    writeMintError,
    simulateMintData,
    simulateMintError
  } = useMintEFP()

  const mintIsPending = simulateMintStatus === 'pending' || writeMintStatus === 'pending'

  const [isPending, startTransition] = React.useTransition()
  // @ts-ignore
  const [step, setStep] = useQueryState<'0' | '1' | '2' | '3'>('step', {
    throttleMs: SECOND / 2,
    defaultValue: '0'
  })
  const [listStorageLocationChainIdStr, setListStorageLocationChainIdStr] = useQueryState(
    'list_storage_location_chain_id',
    {
      throttleMs: SECOND / 2
    }
  )

  function updateStep(direction: 'left' | 'right') {
    const newStep = Number(step) + (direction === 'left' ? -1 : 1)
    startTransition(() => {
      setStep(newStep.toString() as '0' | '1' | '2' | '3')
    })
  }

  const searchParams = useSearchParams()
  const currentSearchParam = searchParams.get('list_storage_location_chain_id')

  function selectListStorageLocationChainId(listStorageLocationChainId: number) {
    startTransition(() => {
      if (listStorageLocationChainId === Number(listStorageLocationChainIdStr)) {
        setListStorageLocationChainIdStr(null)
      } else {
        setListStorageLocationChainIdStr(listStorageLocationChainId.toString())
      }
    })
  }

  // useWatchEfpEvents({
  //   all: true
  // })

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: mintReceipt
  } = useWaitForTransactionReceipt({
    hash
  })

  console.log({ isConfirming, isConfirmed })

  if (!isMounted) return null

  return (
    <Flex justify='center' mx='auto' className='max-w-4xl min-h-full' height='100%'>
      <Card
        my='2'
        mx='auto'
        variant='surface'
        className='max-w-[450px] w-[450px] h-[600px] py-2 text-center rounded-4xl flex'
      >
        <Flex direction='column' justify='between' height='100%'>
          <Box>
            <Heading className='text-2xl w-4/6 mx-auto text-center' mb='1'>
              {steps[step].title}
            </Heading>
            <Code size='5' hidden={steps[step].subtext.length === 0}>
              {steps[step].subtext}
            </Code>
          </Box>

          {step === '0' && (
            <div className='mb-auto mt-6'>
              <Text as='p' weight='bold' size='5' className='' mt='4'>
                Select one
              </Text>

              <ul className='mx-auto space-y-2 py-4 text-left'>
                {storeLocation.map((location, index) => (
                  <li
                    key={`store-location-${index}`}
                    className={clsx([
                      'rounded-2xl border-2 border-transparent px-2 py-1.5 hover:border-lime-200 mx-auto self-center',
                      Number(listStorageLocationChainIdStr) === location.chainId
                        ? 'bg-lime-100'
                        : 'bg-transparent'
                    ])}
                  >
                    <Button
                      onClick={_event => selectListStorageLocationChainId(location.chainId)}
                      variant='ghost'
                      className={clsx([
                        'flex items-center space-x-4 rounded-xl px-4 text-left text-black hover:bg-transparent mx-auto'
                      ])}
                    >
                      <Image
                        width={62}
                        height={62}
                        alt={`${location.name} location`}
                        src={location.image}
                      />
                      <div className='ml-3 my-auto mb-3'>
                        <span className='text-md'>{location.label}</span>
                        <p className='text-2xl font-bold capitalize'>{location.name}</p>
                        <span
                          className={clsx([
                            'text-xs',
                            location.gas === 'Low gas fees' ? 'text-lime-500' : 'text-salmon-500'
                          ])}
                        >
                          {location.gas}
                        </span>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === '1' && (
            <React.Fragment>
              <Box mb='auto' mt='9'>
                <Text as='p' weight='bold' size='5' my='4'>
                  Actions
                </Text>
                <Text>
                  Create a new EFP List on{' '}
                  <Code variant='outline' className='font-bold' color='gray'>
                    {
                      storeLocation.find(
                        location => location.chainId === Number(listStorageLocationChainIdStr)
                      )?.name
                    }
                  </Code>
                </Text>
                <img
                  src='/assets/greencheck.svg'
                  alt='checkmark'
                  className='w-6 h-6 mx-auto my-3'
                  loading='lazy'
                />
                <Badge variant='outline' size='2' color='teal'>
                  {isConfirming
                    ? 'Confirming...'
                    : isConfirmed
                      ? 'Confirmed'
                      : simulateMintStatus === 'success'
                        ? 'Ready'
                        : 'Simulating transaction…'}
                </Badge>
                <Text>{hash}</Text>
              </Box>
            </React.Fragment>
          )}

          {step === '2' && (
            <React.Fragment>
              <Box my='4'>
                <Text as='p' weight='bold' size='5' className='' my='3'>
                  Actions
                </Text>
                <Text>
                  Create a new EFP List on{' '}
                  <Code variant='outline' className='font-bold' color='gray'>
                    {
                      storeLocation.find(
                        location => location.chainId === Number(listStorageLocationChainIdStr)
                      )?.name
                    }
                  </Code>
                </Text>
                <Text as='p' size='5' weight='bold' my='4'>
                  Status
                </Text>
                <CreateEfpList />
              </Box>
            </React.Fragment>
          )}

          <Flex justify='between' mx='6' mb='2'>
            <Button
              disabled={step === '0'}
              onClick={event => {
                console.log('clicked cancel')
                event.preventDefault()
                updateStep('left')
              }}
              size='4'
              variant='solid'
              radius='full'
              className='text-black w-[100px] bg-[#9b9b9b]'
            >
              {steps[step].leftButton}
            </Button>
            <Button
              onClick={event => {
                event.preventDefault()
                if (step === '1' && simulateMintData?.request) {
                  console.log(!!simulateMintData?.request)
                  writeMint(simulateMintData.request)
                } else updateStep('right')
              }}
              size='4'
              radius='full'
              variant='solid'
              disabled={!listStorageLocationChainIdStr}
              className={clsx([
                listStorageLocationChainIdStr
                  ? 'bg-gradient-to-t from-[#FFDE60] to-[#ffa08d]'
                  : 'bg-[#9b9b9b]',
                'w-[100px] text-black'
              ])}
            >
              {steps[step].rightButton}
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}
