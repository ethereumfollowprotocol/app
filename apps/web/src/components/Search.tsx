'use client'

import * as React from 'react'
import { useI18n } from '#/locales/client'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { TextField, Flex, IconButton, Dialog } from '@radix-ui/themes'
import type { PropsWithChildren, ComponentPropsWithoutRef } from 'react'

export function SearchBar(
  props: PropsWithChildren<ComponentPropsWithoutRef<typeof TextField.Input>>,
) {
  return (
    <TextField.Root
      className='hidden lg:flex w-[390px]'
      size={{
        initial: '2',
        sm: '2',
        md: '3',
      }}
    >
      <TextField.Slot className='pr-1.5'>
        <MagnifyingGlassIcon
          height={16}
          width={16}
        />
      </TextField.Slot>
      <TextField.Input
        radius='large'
        color='gray'
        variant='soft'
        // TODO: remove cursed ring
        className='focus:ring-0 focus:outline-none outline-none shadow-none lowercase text-sm'
        type='search'
        {...props}
      />
    </TextField.Root>
  )
}

export function Search() {
  const t = useI18n()
  const router = useRouter()
  const [search, setSearch] = React.useState<string | null>(null)

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    // TODO: validate search
    router.push(`/account/${search}`)
  }

  return (
    <Flex
      direction='column'
      gap='3'
      className='w-full max-w-sm'
    >
      <SearchBar
        placeholder={t('SEARCH_PLACEHOLDER')}
        onChange={onInputChanged}
        onKeyDown={onEnterPressed}
      />
      <Dialog.Root>
        <Dialog.Trigger className='lg:hidden w-10'>
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
          style={{ maxWidth: 450 }}
          className='p-0 mx-4'
          size={'1'}
        >
          <TextField.Root
            className='w-full'
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
              placeholder={t('SEARCH_PLACEHOLDER')}
              radius='large'
              color='gray'
              variant='soft'
              // TODO: remove cursed ring
              className='focus:ring-0 focus:outline-none outline-none shadow-none lowercase'
              type='search'
              onChange={onInputChanged}
              onKeyDown={onEnterPressed}
            />
          </TextField.Root>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  )
}
