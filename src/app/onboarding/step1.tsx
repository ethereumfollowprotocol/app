import { Badge, Box, Code, Heading, Text } from '@radix-ui/themes'
import * as React from 'react'
import {
  LIST_STORAGE_LOCATION_OPTIONS,
  ONBOARDING_STEPS,
  type ListStorageLocationOption
} from './constants'

const STEP_ONE = '1'

interface Props {
  onLocationSelect: (chainId: number) => void
  selectedListStorageLocationChainId: number | null
  listStorageLocationOptions: ListStorageLocationOption[]
}

const OnboardingStep0SelectStorageLocation: React.FC<Props> = ({
  onLocationSelect,
  selectedListStorageLocationChainId,
  listStorageLocationOptions
}) => {
  return (
    <>
      <Box>
        <Heading className='text-2xl w-4/6 mx-auto text-center' mb='1'>
          {ONBOARDING_STEPS[STEP_ONE].title}
        </Heading>
        <h4 className='text-sm mx-auto text-center font-bold text-gray-400 mt-2'>
          {ONBOARDING_STEPS[STEP_ONE].subtext}
        </h4>
      </Box>
      <React.Fragment>
        <Box mb='auto' mt='9'>
          <Text as='p' weight='bold' size='5' my='4'>
            Actions
          </Text>
          <Text>
            Create a new EFP List on{' '}
            <Code variant='outline' className='font-bold' color='gray'>
              {
                LIST_STORAGE_LOCATION_OPTIONS.find(
                  location => location.chainId === selectedListStorageLocationChainId
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
    </>
  )
}

export default OnboardingStep0SelectStorageLocation
