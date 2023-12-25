'use client'

import * as React from 'react'
import { SECOND } from '#lib/constants/index.ts'
import { useQueryState } from 'next-usequerystate'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

export function Searchbar({
  disabled,
  queryKey,
  placeholder = 'Search...'
}: {
  disabled?: boolean
  queryKey: string
  placeholder: string
}) {
  const [isPending, startTransition] = React.useTransition()
  const [query, setQuery] = useQueryState(queryKey, {
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
          id={queryKey}
          name={queryKey}
          spellCheck={false}
          autoComplete='off'
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleSearchEvent}
          value={query ?? ''}
          className='lowercase h-8 block w-full rounded-lg border-0 border-transparent pl-9 sm:text-sm bg-white/50'
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
