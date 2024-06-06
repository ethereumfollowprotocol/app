'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useRef, useState } from 'react'

import searchENSNames from '#/api/fetchENSNames.ts'
import LoadingSpinner from './loading-spinner.tsx'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass.svg'

// autocomplete search suggestions

export function Search({
  disabled,
  size = 'w-full max-w-[400px]'
}: { disabled?: boolean; size?: string }) {
  const { t } = useTranslation()
  const searchBarRef = useRef<HTMLInputElement>(null)

  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<undefined | boolean>(undefined)
  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setDropdownMenuOpen(false)
    setDialogOpen(false)
  })

  const [currentSearch, setCurrentSearch] = useState('')
  const [search, setSearch] = useQueryState('search', {
    history: 'push',
    parse: value => value?.trim().toLowerCase(),
    serialize: value => value.trim().toLowerCase()
  })

  const {
    data,
    status: searchResultStatus,
    isLoading
  } = useQuery({
    queryKey: ['ens-subgraph-search', { search }],
    queryFn: async () => await searchENSNames({ search: search ?? '' }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: Boolean(search && search.length >= 3)
  })

  const searchResult = searchResultStatus === 'success' ? data : []

  let searchTimeout: NodeJS.Timeout | null = null

  const handleSearchEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (searchTimeout) clearTimeout(searchTimeout)
      const term = event?.target.value
      setDropdownMenuOpen(term.replace('.eth', '').length >= 3)
      setCurrentSearch(term)
      searchTimeout = setTimeout(() => setSearch(term), 500)
    },
    [searchTimeout]
  )

  const resetSearch = () => {
    setCurrentSearch('')
    setDropdownMenuOpen(false)
    searchBarRef.current?.blur()
  }

  return (
    <div className={`relative ${size}`} ref={clickAwayRef}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='rounded-md hidden md:block'>
        <input
          ref={searchBarRef}
          type='text'
          id='search'
          name='search'
          spellCheck={false}
          autoComplete='off'
          disabled={disabled}
          value={currentSearch}
          placeholder={t('navigation.search placeholder')}
          onChange={handleSearchEvent}
          onClick={event => {
            event.preventDefault()
            setDropdownMenuOpen(
              event.currentTarget.value.length >= 3 &&
                !!search &&
                search.length >= 3 &&
                !!searchResult
            )
          }}
          className='h-12 block w-full font-medium rounded-xl border-2 border-gray-200 pl-4 text-xs sm:text-sm bg-white/70'
        />
        <div
          className='pointer-events-none absolute inset-y-0 right-2 flex items-center'
          aria-hidden='true'
        >
          <Image
            src={MagnifyingGlass}
            alt='Search'
            className='mr-3 h-5 w-5 text-grey'
            aria-hidden='true'
          />
        </div>
      </div>
      <div
        className={`hidden absolute glass-card p-4 w-full shadow-md border-2 border-gray-200 bg-white/95 rounded-xl top-full mt-2 left-0 md:${
          dropdownMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className='w-full min-w-full text-lg hidden sm:block'
          onFocusCapture={event => {
            event.preventDefault()
            event.stopPropagation()
            searchBarRef.current?.focus()
          }}
        >
          {isLoading && (
            <div className='w-full h-40'>
              <LoadingSpinner />
            </div>
          )}
          {searchResult?.map((result, index) => (
            <div
              key={`${result}`}
              className='max-w-full truncate text-md hover:opacity-75 transition-opacity'
            >
              <Link
                href={{ pathname: result }}
                onClick={() => resetSearch()}
                className='hover:cursor-pointer'
              >
                {result}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='block relative z-50 md:hidden'>
        <Image
          src={MagnifyingGlass}
          onClick={() => setDialogOpen(true)}
          alt='Search'
          className='h-5 w-5'
          aria-hidden='true'
        />
        <div
          ref={clickAwayRef}
          className={`p-0 md:hidden w-[40vw] min-w-68 absolute -top-3 left-0 mx-auto ${
            dialogOpen ? 'block' : 'hidden'
          }`}
        >
          <div>
            <input
              name='search'
              className='h-11 rounded-xl border-2 w-full shadow-md border-gray-200 px-2'
              spellCheck={false}
              placeholder={t('navigation.search placeholder')}
              disabled={disabled}
              value={currentSearch}
              onChange={handleSearchEvent}
              onClick={event => {
                event.preventDefault()
                setDropdownMenuOpen(
                  event.currentTarget.value.length >= 3 &&
                    !!search &&
                    search.length >= 3 &&
                    !!searchResult
                )
              }}
              autoComplete='off'
            />
          </div>
          <div
            className={`absolute glass-card w-full shadow-md border-2 p-3 rounded-xl bg-white/95 border-gray-200 top-full mt-2 left-0 ${
              dropdownMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div
              className='w-full mx-auto min-w-full text-lg py-0 md:hidden block '
              ref={clickAwayRef}
              onFocusCapture={event => {
                event.preventDefault()
                event.stopPropagation()
                searchBarRef.current?.focus()
              }}
            >
              {isLoading && (
                <div className='w-full h-40'>
                  <LoadingSpinner />
                </div>
              )}
              {searchResult?.map((result, index) => (
                <div
                  key={`${result}`}
                  className='max-w-full truncate text-md hover:opacity-75 transition-opacity'
                  tabIndex={0 + 1}
                  onClick={() => {
                    setDialogOpen(false)
                  }}
                >
                  <Link
                    href={{ pathname: result }}
                    onClick={() => resetSearch()}
                    className='hover:cursor-pointer'
                  >
                    {result}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <label className='sr-only'>Search</label>
        </div>
      </div>
    </div>
  )
}
