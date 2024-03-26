'use client'

import { Search } from '#/components/search'
import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import { Recommendations } from '#/app/editor/recommendations'
import { UnconfirmedChanges } from './unconfirmed-changes'
import { Legend } from './legend'

export default function EditorPage() {
  const handleAddFollow = () => {
    console.log('Adding to follow in editor')
  }

  return (
    <main className='flex min-h-full h-full w-full flex-col items-center text-center px-28 pt-10'>
      <Flex gap='9' className='w-full'>
        <Flex direction='column' gap='4' className='w-1/3'>
          <Heading className='text-left mb-4 text-3xl font-bold'>Editor</Heading>
          <Flex gap='2'>
            <Search />
            <Button
              className='bg-gradient-to-b from-kournikova-300 to-salmon-400 text-black h-auto'
              radius='full'
              onClick={handleAddFollow}
              size='3'
            >
              Add
            </Button>
          </Flex>
          <Box px='6'>
            <Recommendations header='Recommendations' />
          </Box>
        </Flex>
        <Flex direction='column' gap='4' className='w-2/3'>
          <Flex justify='between' mx='5' align='center'>
            <Heading as='h2' weight='bold'>
              Unconfirmed Changes
            </Heading>
            <Legend />
          </Flex>
          <UnconfirmedChanges />
        </Flex>
      </Flex>
    </main>
  )
}
