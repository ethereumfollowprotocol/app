'use client'

import * as React from 'react'
import Image from 'next/image'
import { Heading, Text, Button, Separator, Callout } from '@radix-ui/themes'
import { CheckIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { useI18n, useScopedI18n } from '#/locales/client'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { useAccount, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

const storeLocation = [
  {
    name: 'optimism',
    label: 'Ethereum L2',
    gas: 'Low gas fees',
    image: '/assets/chains/optimism.svg',
  },
  {
    name: 'arbitrum',
    label: 'Ethereum L2',
    gas: 'Low gas fees',
    image: '/assets/chains/arbitrum.svg',
  },
  {
    name: 'base',
    label: 'Ethereum L2',
    gas: 'Low gas fees',
    image: '/assets/chains/base.svg',
  },
  {
    name: 'ethereum',
    label: undefined,
    gas: 'High gas fees',
    image: '/assets/chains/ethereum.svg',
  },
  {
    name: 'custom',
    label: undefined,
    gas: undefined,
    image: '/assets/gradient-circle.svg',
  },
] as const

export function OnboardingForm() {
  const { address } = useAccount()
  const {
    data: sendTransactionData,
    error: sendTransactionError,
    status: sendTransactionStatus,
    sendTransaction,
    sendTransactionAsync,
  } = useSendTransaction({
    account: address,
    to: '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83',
    value: parseEther('0.1'),
  })

  const t = useI18n()
  const scopedT = useScopedI18n('ONBOARDING')
  const [formStep, setFormStep] = React.useState(0)
  const [selectedStoreLocation, setSelectedStoreLocation] = React.useState<
    (typeof storeLocation)[number] | undefined
  >()

  const nextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormStep(previous => previous + 1)
  }
  const previousStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setFormStep(previous => previous - 1)
  }

  return (
    <form className='w-full sm:w-[500px] h-full bg-zinc-100 rounded-2xl p-8 flex flex-col'>
      {formStep === 0 ? (
        <>
          <Heading className='text-xl font-bold sm:px-2'>
            {scopedT('Where would you like to store your EFP List?')}
          </Heading>
          <Text className='text-gray-600 py-2'>{scopedT('You can always change this later')}</Text>

          <Text className='font-bold pt-3'>{scopedT('Select one')}</Text>
          <ul className='text-left mx-auto py-4 space-y-2'>
            {storeLocation.map((location, index) => (
              <li
                key={`store-location-${index}`}
                className={clsx([
                  'rounded-2xl border-2 border-transparent hover:border-lime-200 px-2 py-1.5',
                  selectedStoreLocation?.name === location.name ? 'bg-lime-100' : 'bg-transparent',
                ])}
              >
                <Button
                  onClick={event => {
                    event.preventDefault()
                    setSelectedStoreLocation(location)
                  }}
                  variant='ghost'
                  className={clsx([
                    'text-left flex items-center space-x-8 text-black px-4 rounded-xl hover:bg-transparent',
                  ])}
                >
                  <Image
                    width={62}
                    height={62}
                    alt={location.name}
                    src={location.image}
                  />
                  <div className='ml-3'>
                    <span className='text-xs'>{location.label}</span>
                    <p className='text-lg font-bold capitalize'>{location.name}</p>
                    <span
                      className={clsx([
                        'text-xs',
                        location.gas === scopedT('Low gas fees')
                          ? 'text-lime-500'
                          : 'text-salmon-500',
                      ])}
                    >
                      {location.gas}
                    </span>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
          <section className='flex justify-between px-4 pt-2'>
            <Button
              variant='soft'
              size='3'
              radius='full'
              color='gray'
              className='w-24 font-bold text-black bg-gray-300'
              onClick={previousStep}
            >
              {scopedT('BUTTON.CANCEL')}
            </Button>
            <Button
              variant={selectedStoreLocation ? 'classic' : 'soft'}
              radius='full'
              color='pink'
              size='3'
              className={clsx([
                'w-24 font-bold text-black',
                selectedStoreLocation
                  ? 'bg-gradient-to-b from-amber-300 to-red-300'
                  : 'bg-gray-300',
              ])}
              onClick={nextStep}
            >
              {scopedT('BUTTON.NEXT')}
            </Button>
          </section>
        </>
      ) : formStep === 1 ? (
        <>
          <Heading className='text-2xl font-bold sm:px-12'>{scopedT('Onchain Update')}</Heading>
          <Text className='text-gray-600 py-2'>{scopedT('SUMMARY')}</Text>
          <Text className='font-bold pt-3'>{scopedT('ACTIONS')}</Text>

          <ul className='text-left mx-auto py-4 space-y-5'>
            <li className='flex'>
              <CheckIcon
                color='lime'
                width={26}
                height={26}
              />
              <span>{scopedT('Create new EFP List')}</span>
            </li>
            <li className='flex'>
              <CheckIcon
                color='lime'
                width={26}
                height={26}
              />
              <span>24 edits to List Records</span>
            </li>
          </ul>
          <Separator className='w-full my-4' />
          <section className='mx-auto'>
            <Text className='font-bold'>{scopedT('Required Transactions')}</Text>
            <ul className='flex flex-col justify-center mx-auto py-4 space-y-5'>
              <li className='flex'>
                1 tx
                <Image
                  src={`/assets/chains/ethereum.svg`}
                  width={24}
                  height={24}
                  alt='ethereum'
                  className='mx-2'
                />
                <label>Ethereum</label>
              </li>
              <li className='flex'>
                1 tx
                <Image
                  src={selectedStoreLocation?.image || '/assets/gradient-circle.svg'}
                  width={24}
                  height={24}
                  className='mx-2'
                  alt={`${selectedStoreLocation}`}
                />
                <label className='capitalize'>{selectedStoreLocation?.name}</label>
              </li>
            </ul>
          </section>
          <section className='flex justify-between px-4 pt-4'>
            <Button
              variant='solid'
              size='3'
              radius='full'
              color='gray'
              className='w-24 font-bold text-black'
              onClick={previousStep}
            >
              Back
            </Button>
            <Button
              variant='classic'
              radius='full'
              color='pink'
              size='3'
              className='w-24 font-bold text-black bg-gradient-to-b from-amber-300 to-red-300'
              onClick={event => {
                event.preventDefault()
                sendTransaction()
              }}
            >
              Initiate
            </Button>
          </section>
        </>
      ) : undefined}
    </form>
  )
}

function FormStep({
  children,
  step,
  currentStep,
  previousStep,
  nextStep,
}: {
  children: React.ReactNode
  step: number
  currentStep: number
  previousStep: (event: React.MouseEvent<HTMLButtonElement>) => void
  nextStep: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  if (step !== currentStep) return
  return (
    <>
      {children}
      <section className='flex justify-between px-4 pt-4'>
        <Button
          variant='solid'
          size='3'
          radius='full'
          color='gray'
          className='w-24 font-bold text-black'
          onClick={previousStep}
        >
          {step === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button
          variant='classic'
          radius='full'
          color='pink'
          size='3'
          className='w-24 font-bold text-black bg-gradient-to-b from-amber-300 to-red-300'
          onClick={step === 3 ? () => {} : nextStep}
        >
          Next
        </Button>
      </section>
    </>
  )
}
