'use client'

import Image from 'next/image'
import { useQueryState } from 'next-usequerystate'

import { SECOND } from '#/lib/constants/index.ts'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass.svg'

export function Searchbar({
  disabled,
  queryKey,
  placeholder = 'Search...'
}: {
  disabled?: boolean
  queryKey: string
  placeholder: string
}) {
  const [query, setQuery] = useQueryState(queryKey, {
    throttleMs: SECOND / 2,
    shallow: false,
    parse: value => value,
    serialize: value => value
  })

  function handleSearchEvent(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event.target.value
    setQuery(term.trim().toLowerCase())
  }

  return (
    <div className='relative w-[260px] 2xl:w-[300px]'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='rounded-lg w-full glass-card border-2 border-gray-200'>
        <div
          className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'
          aria-hidden='true'
        >
          <Image
            src={MagnifyingGlass}
            alt='Search'
            className='mr-3 h-4 w-4 text-gray-400'
            aria-hidden='true'
          />
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
          className='lowercase h-9 block w-full rounded-lg border-0 font-medium border-transparent pl-9 pr-10 sm:text-sm'
        />
      </div>
    </div>
  )
}
