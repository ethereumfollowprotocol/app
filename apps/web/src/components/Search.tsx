'use client'

import * as React from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField, Flex, IconButton } from '@radix-ui/themes'

export function Search() {
  return (
    <Flex
      direction='column'
      gap='3'
      className='w-full max-w-sm'
    >
      <TextField.Root
        className='hidden sm:flex w-full'
        size={{
          initial: '2',
          sm: '2',
          md: '3',
        }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon
            height={16}
            width={16}
          />
        </TextField.Slot>
        <TextField.Input
          placeholder='Search ENS or 0x address…'
          radius='large'
          color='gray'
          variant='soft'
          className='focus:ring-0'
          type='search'
          onKeyDown={event => {
            if (event.key !== 'Enter') return
            event.preventDefault()
          }}
        />
      </TextField.Root>
      <IconButton
        variant='soft'
        color='gray'
        size={'3'}
        className='sm:hidden'
        // onClick={event => {}}
      >
        <MagnifyingGlassIcon
          height={24}
          width={24}
        />
      </IconButton>
    </Flex>
  )
}
