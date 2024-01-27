import { Box, Code, Flex, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import type * as React from 'react'
import {
  LIST_STORAGE_LOCATION_OPTION_ETHEREUM,
  ONBOARDING_STEPS,
  type ListStorageLocationOption
} from './constants'

const STEP_ONE = '1'

interface Props {
  selectedListStorageLocationOption: ListStorageLocationOption | null
}

const OnboardingStep1OnchainUpdateSummary: React.FC<Props> = ({
  selectedListStorageLocationOption
}) => {
  return (
    <Box>
      <Box>
        <Heading className='text-2xl w-4/6 mx-auto text-center' mb='1'>
          {ONBOARDING_STEPS[STEP_ONE].title}
        </Heading>
        <h4 className='text-sm mx-auto text-center font-bold text-gray-400 mt-2'>
          {ONBOARDING_STEPS[STEP_ONE].subtext}
        </h4>
      </Box>
      <Box mb='auto' mt='9'>
        <Text as='p' weight='bold' size='5' my='4'>
          Actions
        </Text>
        <Flex direction='column' gap='3'>
          <Text>Create a new EFP List</Text>
          <Flex align='center' justify='center' gap='2'>
            <Text>TODO: N edits to List Records</Text>
            <Code variant='outline' className='font-bold' color='gray'>
              {selectedListStorageLocationOption?.name}
            </Code>
          </Flex>
        </Flex>
      </Box>
      <Box mb='auto' mt='9'>
        <Text as='p' weight='bold' size='5' my='4'>
          Required Transactions
        </Text>
        <Flex direction='column' align='center' gap='3'>
          <Flex align='center' gap='2'>
            <Text>1 tx</Text>
            <Image
              width={24}
              height={24}
              alt={`${LIST_STORAGE_LOCATION_OPTION_ETHEREUM.name} location`}
              src={LIST_STORAGE_LOCATION_OPTION_ETHEREUM.icon || ''}
            />
            <Code variant='outline' className='font-bold' color='gray'>
              {LIST_STORAGE_LOCATION_OPTION_ETHEREUM.name}
            </Code>
          </Flex>
          <Flex align='center' gap='2'>
            <Text>1 tx</Text>
            <Image
              width={24}
              height={24}
              alt={`${selectedListStorageLocationOption?.name} location`}
              src={selectedListStorageLocationOption?.icon || ''}
            />
            <Code variant='outline' className='font-bold' color='gray'>
              {selectedListStorageLocationOption?.name}
            </Code>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

export default OnboardingStep1OnchainUpdateSummary
