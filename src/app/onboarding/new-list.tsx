'use client'

import '#/lib/patch.ts'
import clsx from 'clsx'
import Image from 'next/image'
import { toast } from 'sonner'
import * as React from 'react'
import { SECOND } from '#/lib/constants'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'next-usequerystate'
import { useMintEFP } from '#/hooks/use-mint-efp.ts'
import { useEffectOnce } from '#/hooks/use-effect-once'
import { useIsMounted } from '#/hooks/use-is-mounted.ts'
import { efpContracts } from '#/lib/constants/contracts'
import { useWatchEfpEvents } from '#/app/efp/use-watch-efp-events.ts'
import { Box, Button, Card, Code, Flex, Heading, Text } from '@radix-ui/themes'
import { truncateAddress } from '#/lib/utilities'

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
    writeMintData,
    simulateMintStatus,
    writeMintStatus,
    writeMintError,
    simulateMintData,
    simulateMintError
  } = useMintEFP()

  const [isPending, startTransition] = React.useTransition()
  // @ts-ignore
  const [step, setStep] = useQueryState<'0' | '1' | '2' | '3'>('step', {
    throttleMs: SECOND / 2,
    defaultValue: '0'
  })
  const [storageLocation, setStorageLocation] = useQueryState('location', {
    throttleMs: SECOND / 2
  })

  function updateStep(direction: 'left' | 'right') {
    const newStep = Number(step) + (direction === 'left' ? -1 : 1)
    startTransition(() => {
      setStep(newStep.toString() as '0' | '1' | '2' | '3')
    })
  }

  const searchParams = useSearchParams()
  const currentSearchParam = searchParams.get('location')

  function selectStorageLocation(location: string) {
    startTransition(() => {
      if (location === storageLocation) setStorageLocation(null)
      else setStorageLocation(location)
    })
  }

  useWatchEfpEvents({
    all: true
  })
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
                      Number(storageLocation) === location.chainId
                        ? 'bg-lime-100'
                        : 'bg-transparent'
                    ])}
                  >
                    <Button
                      onClick={_event => selectStorageLocation(location.chainId.toString())}
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
              <Box my='4'>
                <Text as='p' weight='bold' size='5' className='' my='4'>
                  Actions
                </Text>
                <Text>
                  Create a new EFP List on{' '}
                  <Code variant='outline' className='font-bold' color='gray'>
                    {
                      storeLocation.find(location => location.chainId === Number(storageLocation))
                        ?.name
                    }
                  </Code>
                </Text>
                <img
                  src='/assets/greencheck.svg'
                  alt='checkmark'
                  className='w-6 h-6 mx-auto my-3'
                  loading='lazy'
                />
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
                      storeLocation.find(location => location.chainId === Number(storageLocation))
                        ?.name
                    }
                  </Code>
                </Text>
                <Text as='p' size='5' weight='bold' my='4'>
                  Status
                </Text>
                <div>
                  Errors
                  {simulateMintError && <Text as='p'>{simulateMintError.message}</Text>}
                  {writeMintError && <Text as='p'>{writeMintError.message}</Text>}
                </div>
                <div>
                  <Text as='p'>
                    Transaction:{' '}
                    <span className='font-bold'>{simulateMintData?.request.__mode}</span>
                  </Text>
                  <Text as='p'>
                    Transaction hash: <span>{truncateAddress(writeMintData)}</span>
                  </Text>
                </div>
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
                }
                updateStep('right')
              }}
              size='4'
              radius='full'
              variant='solid'
              disabled={!storageLocation}
              className={clsx([
                storageLocation ? 'bg-gradient-to-t from-[#FFDE60] to-[#ffa08d]' : 'bg-[#9b9b9b]',
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
