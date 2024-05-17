'use client'

import clsx from 'clsx'
import { useQueryState } from 'next-usequerystate'
import type { QueryStatus } from '@tanstack/react-query'
import { useState, useTransition, type MouseEventHandler } from 'react'

import '#/lib/patch.ts'
import { SECOND } from '#/lib/constants'
import { truncateAddress } from '#/lib/utilities'
import { useMintEFP } from '#/hooks/use-mint-efp.ts'
import { useIsMounted } from '#/hooks/use-is-mounted.ts'
import OnboardingStep1OnchainUpdateSummary from './step1'
import OnboardingStep0SelectStorageLocation from './step0'
import { LIST_STORAGE_LOCATION_OPTIONS, ONBOARDING_STEPS } from './constants'

type StepType = '0' | '1' | '2' | '3'

/**
 * Steps
 * 0. Select where to store EFP List: Ethereum or Optimism,
 * 1. Show confirmation step summarizing what's about to happen, cost, and a button to initiate,
 * 2. Tell user transaction needs approval,
 * 3. Show pending transaction with view on Etherscan,
 * 4. Show success message with link to EFP List,
 */

export function CreateNewListForm() {
  const isMounted = useIsMounted()
  const [_, startTransition] = useTransition()
  const [mintHash, setMintHash] = useState<string | undefined>()
  const [mintError, setMintError] = useState<string | undefined>()
  const [mintStatus, setMintStatus] = useState<QueryStatus | undefined>()

  // @ts-ignore
  const [step, setStep] = useQueryState<StepType>('step', {
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
      setStep(newStep.toString() as StepType)
    })
  }

  const { mint, walletClient } = useMintEFP()

  const mintEFPList = async () => {
    setMintStatus('pending')
    setMintError(undefined)
    setMintHash(undefined)
    const res = await mint()

    if (!res || res?.status === 'error') {
      setMintStatus('error')
      setMintError(res?.message || 'Something went wrong.')
      return
    }

    setStep('3')
    setMintStatus('success')
    setMintHash(res.hash)
  }

  // const searchParams = useSearchParams()
  // const currentSearchParam = searchParams.get('list_storage_location_chain_id')

  async function selectListStorageLocationChainId(listStorageLocationChainId: number) {
    startTransition(() => {
      if (listStorageLocationChainId === Number(listStorageLocationChainIdStr)) return
      setListStorageLocationChainIdStr(listStorageLocationChainId.toString())
    })
  }

  // console.log(mintStatus, step)

  const onClickNextStep: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()

    const stepFn = {
      0: async () => {
        if (!listStorageLocationChainIdStr) return
        await walletClient?.switchChain({ id: Number(listStorageLocationChainIdStr) })
        updateStep('right')
      },
      1: async () => {
        updateStep('right')
        await mintEFPList()
      },
      2: async () => {
        await mintEFPList()
      },
      3: () => window.open(`https://sepolia.etherscan.io/tx/${mintHash}`)
    }[step]

    stepFn()
  }

  const onClickPreviousStep: MouseEventHandler<HTMLButtonElement> = event => {
    // console.log('clicked cancel')
    event.preventDefault()
    updateStep('left')
  }

  // useWatchEfpEvents({
  //   all: true
  // })

  if (!isMounted) return null

  const txStatus = mintStatus
    ? {
        pending: <p>Transaction is confirming...</p>,
        success: <p>Transaction hash: {truncateAddress(mintHash)}</p>,
        error: <p>{mintError}</p>
      }[mintStatus]
    : null

  return (
    <div className='justify-center mx-auto max-w-4xl h-full'>
      <div className='max-w-[450px] w-[450px] h-[600px] my-2 py-2 mx-auto text-center rounded-4xl flex'>
        <div className='flex flex-col justify-between h-full'>
          {/* <Box>
            <Heading className='text-2xl w-4/6 mx-auto text-center' mb='1'>
              {steps[step].title}
            </Heading>
            <Code size='5' hidden={steps[step].subtext.length === 0}>
              {steps[step].subtext}
            </Code>
          </Box> */}

          {step === '0' && (
            <OnboardingStep0SelectStorageLocation
              onLocationSelect={selectListStorageLocationChainId}
              selectedListStorageLocationChainId={Number(listStorageLocationChainIdStr)}
              listStorageLocationOptions={LIST_STORAGE_LOCATION_OPTIONS}
            />
          )}

          {step === '1' && (
            <OnboardingStep1OnchainUpdateSummary
              selectedListStorageLocationOption={
                LIST_STORAGE_LOCATION_OPTIONS.find(
                  location => location.chainId === Number(listStorageLocationChainIdStr)
                ) || null
              }
            />
          )}

          {step === '2' && (
            <>
              <div className='my-4'>
                <p className='my-r font-bold text-3xl'>Actions</p>
                <p>
                  Create a new EFP List on{' '}
                  <code className='font-bold text-gray-400'>
                    {
                      LIST_STORAGE_LOCATION_OPTIONS.find(
                        location => location.chainId === Number(listStorageLocationChainIdStr)
                      )?.name
                    }
                  </code>
                </p>
                <p className='text-2xl font-bold my-4'>Status</p>
                {txStatus}
              </div>
            </>
          )}

          {step === '3' && (
            <>
              <div className='my-4'>
                <p className='text-2xl font-bold my-3'>Actions</p>
                <p>
                  Create a new EFP List on{' '}
                  <code className='font-bold text-gray-400'>
                    {
                      LIST_STORAGE_LOCATION_OPTIONS.find(
                        location => location.chainId === Number(listStorageLocationChainIdStr)
                      )?.name
                    }
                  </code>
                </p>
                <p className='text-2xl font-bold my-4'>Status</p>
                {txStatus}
              </div>
            </>
          )}

          <div className='flex justify-between mx-6 mb-2'>
            <button
              disabled={step === '0' || mintStatus === 'pending'}
              onClick={onClickPreviousStep}
              className='text-black w-[100px] bg-[#9b9b9b]'
            >
              {ONBOARDING_STEPS[step].leftButton}
            </button>
            <button
              onClick={onClickNextStep}
              disabled={!listStorageLocationChainIdStr || mintStatus === 'pending'}
              className={clsx([
                listStorageLocationChainIdStr
                  ? 'bg-gradient-to-t from-[#FFDE60] to-[#ffa08d]'
                  : 'bg-[#9b9b9b]',
                'w-[100px] text-black'
              ])}
            >
              {ONBOARDING_STEPS[step].rightButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
