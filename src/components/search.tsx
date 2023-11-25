'use client'

import clsx from 'clsx'
import * as React from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField, Flex, IconButton, Dialog } from '@radix-ui/themes'
import type { PropsWithChildren, ComponentPropsWithoutRef } from 'react'

export function SearchBar({
  _className,
  ...properties
}: PropsWithChildren<ComponentPropsWithoutRef<typeof TextField.Input>> & {
  _className?: string
}) {
  return (
    <TextField.Root
      className={_className}
      size={{
        initial: '3'
      }}
    >
      <TextField.Input
        radius='large'
        color='gray'
        variant='soft'
        // TODO: remove cursed ring
        className={clsx([
          'rounded-xl shadow-none outline-none focus:outline-none focus:ring-0'
          /**
           * TODO: fix so that invalid style only shows up when submitting
           */
          // 'invalid:border-2 invalid:border-salmon-400',
        ])}
        type='search'
        {...properties}
      />
    </TextField.Root>
  )
}

export function Search({ className }: { className?: string }) {
  const router = useRouter()
  const [search, setSearch] = React.useState<string | undefined>()

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    // TODO: validate search
    router.push(`/search?q=${search}`)
  }

  return (
    <Flex direction='column' gap='3' className={clsx(['w-full max-w-[420px]', className])}>
      <SearchBar
        className='lg:text-md hidden w-full rounded-lg max-w-[420px] text-sm lg:flex placeholder:font-semibold !placeholder-zinc-500 bg-white/70'
        name='search'
        id='search'
        aria-label='Search'
        inputMode='search'
        onChange={onInputChanged}
        onKeyDown={onEnterPressed}
        placeholder={'Search ENS or 0x address…'}
        minLength={7}
        maxLength={64}
        width={'100%'}
        radius='large'
        autoComplete='off'
        pattern='0x[a-fA-F0-9]{40}|.{7,64}'
      />
      <Dialog.Root>
        <div className='lg:hidden'>
          <Dialog.Trigger className='mb-3 w-10'>
            <IconButton variant='soft' color='gray' size={'3'} radius='large'>
              <MagnifyingGlassIcon height={24} width={24} />
            </IconButton>
          </Dialog.Trigger>
        </div>

        <Dialog.Content size={'3'} className='mb-42 mx-4 w-full max-w-[364px] p-0'>
          <SearchBar
            name='search'
            id='search'
            aria-label='Search'
            inputMode='search'
            onChange={onInputChanged}
            onKeyDown={onEnterPressed}
            className='w-full max-w-[364px]'
            placeholder={'Search ENS or 0x address…'}
            minLength={7}
            maxLength={64}
            width={'100%'}
            autoComplete='off'
            pattern='0x[a-fA-F0-9]{40}|.{7,64}'
          />
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  )
}
