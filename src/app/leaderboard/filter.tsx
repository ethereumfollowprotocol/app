'use client'

import clsx from 'clsx'
import * as React from 'react'
import { SECOND } from '#lib/constants/index.ts'
import { useSearchParams } from 'next/navigation'
import { useQueryState } from 'next-usequerystate'
import { Box, Button, Select } from '@radix-ui/themes'
import { useEffectOnce } from '#hooks/use-effect-once.ts'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export function FilterList({
  disabled
}: {
  disabled?: boolean
}) {
  const [, startTransition] = React.useTransition()
  const [filter, setFilter] = useQueryState('filter', {
    throttleMs: SECOND / 2
  })

  const filterParam = useSearchParams()

  // On first visit: check url search param and set filter state
  useEffectOnce(() => {
    startTransition(() => {
      setFilter(filterParam.get('filter'))
    })
  })

  function handleChange(newFilter: string | null) {
    startTransition(() => {
      if (newFilter === filter) setFilter(null)
      else if (filter) setFilter(newFilter)
      else setFilter(newFilter)
    })
  }

  function handleChangeEvent(event?: React.MouseEvent<HTMLButtonElement>) {
    const newFilter = event?.currentTarget.name ?? null
    handleChange(newFilter)
  }

  console.log(filter)
  return (
    <Box className='space-x-3 lg:ml-0 mr-auto' my='auto'>
      <div className='block lg:hidden mr-2'>
        <Select.Root
          defaultValue={filter?.toLowerCase()}
          value={filter?.toLowerCase()}
          onValueChange={handleChange}
        >
          <Select.Trigger
            variant='soft'
            className='rounded-lg bg-white/70 p-4 font-semibold !border-none text-sm ml-2'
          />
          <Select.Content>
            <Select.Group>
              <Select.Item value='following'>Following</Select.Item>
              <Select.Item value='followers'>Followers</Select.Item>
              <Select.Item value='mutuals'>Mutuals</Select.Item>
              <Select.Item value='blocked-muted'>Blocked+Muted</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>

      <div className='hidden lg:block space-x-3'>
        <Button
          size='2'
          radius='full'
          className={clsx([
            'text-sm px-4 font-semibold text-black',
            filter === 'following' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          name='following'
          onClick={handleChangeEvent}
        >
          Following
        </Button>
        <Button
          size='2'
          radius='full'
          className={clsx([
            'text-sm px-4 font-semibold text-black',
            filter === 'followers' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          name='followers'
          onClick={handleChangeEvent}
        >
          Followers
        </Button>
        <Button
          size='2'
          radius='full'
          className={clsx([
            'text-sm px-4 font-semibold text-black',
            filter === 'mutuals' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          name='mutuals'
          onClick={handleChangeEvent}
        >
          Mutuals
        </Button>
        <Button
          size='2'
          radius='full'
          className={clsx([
            'text-sm px-4 font-semibold text-black',
            filter === 'blocked-muted' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          name='blocked-muted'
          onClick={handleChangeEvent}
        >
          Blocked+Muted
        </Button>
      </div>
    </Box>
  )
}

export function LeaderboardSearch({ disabled }: { disabled?: boolean }) {
  const [isPending, startTransition] = React.useTransition()
  const [query, setQuery] = useQueryState('query', {
    throttleMs: SECOND / 2,
    shallow: false
  })

  function handleSearchEvent(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value
    startTransition(() => {
      if (term) setQuery(term)
      else setQuery(null)
    })
  }

  return (
    <div className='relative max-w-md'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='rounded-md shadow-sm'>
        <div
          className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'
          aria-hidden='true'
        >
          <MagnifyingGlassIcon className='mr-3 h-4 w-4 text-gray-400' aria-hidden='true' />
        </div>
        <input
          type='text'
          id='search'
          name='search'
          spellCheck={false}
          autoComplete='off'
          disabled={disabled}
          placeholder='Search…'
          onChange={handleSearchEvent}
          value={query ?? ''}
          className='lowercase h-10 block w-full rounded-xl border-0 border-transparent pl-9 sm:text-sm bg-white/50'
        />
      </div>

      {isPending && (
        <div className='absolute right-0 top-0 bottom-0 flex items-center justify-center'>
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        </div>
      )}
    </div>
  )
}
