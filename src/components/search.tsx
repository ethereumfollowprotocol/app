'use client'

import * as React from 'react'
import { useI18n } from '#/locales/client'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField, Flex, IconButton, Dialog } from '@radix-ui/themes'
import type { PropsWithChildren, ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'

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
        initial: '3',
      }}
    >
      <TextField.Input
        radius='large'
        color='gray'
        variant='soft'
        // TODO: remove cursed ring
        className={clsx([
          'rounded-xl shadow-none outline-none focus:outline-none focus:ring-0',
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

export function Search() {
  const t = useI18n()
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
    <Flex
      direction='column'
      gap='3'
      className='w-full max-w-[420px]'
    >
      <SearchBar
        className='lg:text-md hidden w-full max-w-[420px] text-sm lg:flex'
        name='search'
        id='search'
        aria-label='Search'
        inputMode='search'
        onChange={onInputChanged}
        onKeyDown={onEnterPressed}
        placeholder={t('Search ENS or 0x address…')}
        minLength={7}
        maxLength={64}
        width={'100%'}
        autoComplete='off'
        pattern='0x[a-fA-F0-9]{40}|.{7,64}'
      />
      <Dialog.Root>
        <Dialog.Trigger className='mb-3 w-10 lg:hidden'>
          <IconButton
            variant='soft'
            color='gray'
            size={'3'}
            radius='large'
            className='lg:hidden'
          >
            <MagnifyingGlassIcon
              height={24}
              width={24}
            />
          </IconButton>
        </Dialog.Trigger>

        <Dialog.Content
          size={'3'}
          className='mb-42 mx-4 w-full max-w-[364px] p-0'
        >
          <SearchBar
            name='search'
            id='search'
            aria-label='Search'
            inputMode='search'
            onChange={onInputChanged}
            onKeyDown={onEnterPressed}
            className='w-full max-w-[364px]'
            placeholder={t('Search ENS or 0x address…')}
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
