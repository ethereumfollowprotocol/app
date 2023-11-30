'use client'

import clsx from 'clsx'
import * as React from 'react'
import { Box, Button, Select } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function FilterList({
  disabled
}: {
  disabled?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Set default filter to quality
  React.useEffect(() => {
    if (!searchParams.get('filter')) {
      const params = new URLSearchParams(window.location.search)
      params.set('filter', 'quality')
      router.replace(`${pathname}?${params.toString()}`)
    }
  }, [searchParams, router, pathname])

  const selectedFilter = searchParams.get('filter') ?? 'quality'
  const [isPending, startTransition] = React.useTransition()

  function handleFilter(filter: string) {
    const params = new URLSearchParams(window.location.search)
    if (filter) params.set('filter', filter)
    else params.delete('filter')

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }
  return (
    <Box className='space-x-3 lg:ml-0 ml-auto' my='auto'>
      <div className='block lg:hidden mr-2'>
        <Select.Root defaultValue={selectedFilter.toLowerCase()} onValueChange={handleFilter}>
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
            selectedFilter === 'following' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          onClick={() => handleFilter('following')}
        >
          Following
        </Button>
        <Button
          size='2'
          radius='full'
          className={clsx([
            'text-sm px-4 font-semibold text-black',
            selectedFilter === 'followers' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          onClick={() => handleFilter('followers')}
        >
          Followers
        </Button>
        <Button
          size='2'
          radius='full'
          className={clsx([
            'text-sm px-4 font-semibold text-black',
            selectedFilter === 'mutuals' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          onClick={() => handleFilter('mutuals')}
        >
          Mutuals
        </Button>
        <Button
          size='2'
          radius='full'
          className={clsx([
            'text-sm px-4 font-semibold text-black',
            selectedFilter === 'muted-blocked' ? 'bg-white' : 'bg-[#CDCDCD] text-gray-500'
          ])}
          disabled={disabled}
          onClick={() => handleFilter('muted-blocked')}
        >
          Blocked+Muted
        </Button>
      </div>
    </Box>
  )
}

export function LeaderboardSearch({ disabled }: { disabled?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = React.useTransition()

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search)
    if (term) params.set('query', term)
    else params.delete('query')

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
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
          onChange={event => handleSearch(event.target.value)}
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
