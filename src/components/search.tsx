'use client'

import * as React from 'react'
import { isAddress } from 'viem'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// ens min is 3 letters
function validateInput(value: string) {
  return (value.length >= 7 && value.indexOf('.eth') > 0) || isAddress(value)
}

export function Search({ disabled }: { disabled?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value
    const params = new URLSearchParams(window.location.search)
    if (term) params.set('search', term)
    else params.delete('search')

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    /**
     * checking the html element for value to catch an edge case:
     * - when typing a search term then navigating to another page,
     *   the search term is gone from the url but is still in the search input
     */
    const searchElement = event.currentTarget.elements.namedItem('search')
    const domAccessedSearch = searchElement instanceof HTMLInputElement ? searchElement.value : ''

    const search = searchParams.get('search') ?? domAccessedSearch
    if (!search) return

    const inputIsValid = validateInput(search)
    if (!inputIsValid) return

    router.push(`/${search}`)
  }

  return (
    <form onSubmit={onSubmit} className='w-full'>
      <div className='relative max-w-xs w-full'>
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
            onChange={handleSearch}
            className='lowercase h-9 block w-full rounded-xl border-0 border-transparent pl-9 sm:text-sm bg-white/70'
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
    </form>
  )
}
