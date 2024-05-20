'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useRef, useState, useTransition } from 'react'

import { PendingIcon } from './pending.tsx'
import { usePathname } from 'next/navigation'
import { useQueryState } from 'next-usequerystate'
// import { checkAddressOrEnsValid } from '#/lib/utilities.ts'
import { ENS_SUBGRAPH, SECOND } from '#/lib/constants/index.ts'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass.svg'
import { useIsomorphicLayoutEffect } from '#/hooks/use-isomorphic-layout-effect.ts'

// autocomplete search suggestions
async function searchEnsSubgraph({ search }: { search: string }): Promise<string[]> {
  const sanitizedSearch = search.trim().toLowerCase()
  if (sanitizedSearch.length < 3) return []
  const response = await fetch(ENS_SUBGRAPH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: /*GraphQL*/ `
        query SearchQuery($search: String) {
          domains(
            first: 15
            orderBy: id
            orderDirection: asc
            where: {and: [{name_starts_with: $search}, {name_ends_with: ".eth"}]}
          ) {
            name
            registration { registrationDate }
          }
        }`,
      variables: { search: sanitizedSearch },
      operationName: 'SearchQuery'
    })
  })
  if (!response.ok) return []
  const json = (await response.json()) as {
    data: { domains: { name: string; registration: { registrationDate: string } | null }[] }
  }
  return json.data.domains
    .filter(domain => !!domain.registration)
    .map(domain => domain.name)
    .sort((a, b) => a.length - b.length)
}

export function Search({ disabled }: { disabled?: boolean }) {
  const pathname = usePathname()
  const searchBarRef = useRef<HTMLInputElement>(null)
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<undefined | boolean>(undefined)
  const clickAwayRef = useClickAway<HTMLInputElement>(_ => {
    setDropdownMenuOpen(false)
    setDialogOpen(false)
  })
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useQueryState('search', {
    throttleMs: SECOND / 2,
    history: 'push',
    parse: value => value?.trim().toLowerCase(),
    serialize: value => value.trim().toLowerCase()
  })

  const { data, status: searchResultStatus } = useQuery({
    queryKey: ['ens-subgraph-search', { search }],
    queryFn: async () => searchEnsSubgraph({ search: search ?? '' }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: Boolean(search && search.length >= 3)
  })

  const searchResult = searchResultStatus === 'success' ? data : []

  useIsomorphicLayoutEffect(() => {
    setDropdownMenuOpen(searchResult.length > 0)
  }, [searchResult, searchResultStatus])

  useIsomorphicLayoutEffect(() => {
    if (pathname.slice(1) === selectedItem) {
      setDropdownMenuOpen(false)
      // console.log({ dialogOpen })
      if (searchBarRef.current) searchBarRef.current.value = ''
    }
  }, [pathname])

  function handleSearchEvent(event: React.ChangeEvent<HTMLInputElement>) {
    const term = event?.target.value
    startTransition(() => {
      if (term) setSearch(term)
      else setSearch(null)
    })
  }

  // function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   /**
  //    * checking the html element for value to catch an edge case:
  //    * - when typing a search term then navigating to another page,
  //    *   the search term is gone from the url but is still in the search input
  //    */
  //   const searchTerm = search
  //   if (!searchTerm) return
  //   const inputIsValid = checkAddressOrEnsValid(searchTerm)
  //   if (!inputIsValid) return
  // }

  return (
    <div className='relative max-w-[400px] w-full'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='rounded-md shadow-sm hidden sm:block'>
        <input
          ref={searchBarRef}
          type='text'
          id='search'
          name='search'
          spellCheck={false}
          autoComplete='off'
          disabled={disabled}
          placeholder='Search ENS or 0x address…'
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
          className='h-12 block w-full font-medium rounded-xl border-2 border-grey pl-4 text-xs sm:text-sm bg-white/70'
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
        className={`hidden absolute top-full mt-2 left-0 sm:${
          dropdownMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div>
          <div
            className={clsx(['max-w-xl w-80 min-w-full text-lg py-0 hidden sm:block'])}
            ref={clickAwayRef}
            onFocusCapture={event => {
              event.preventDefault()
              event.stopPropagation()
              searchBarRef.current?.focus()
            }}
          >
            {searchResult?.map((result, index) => (
              <div
                key={`${result}`}
                className='w-full text-md py-0 hover:bg-pink-50'
                tabIndex={0 + 1}
                onClick={() => setSelectedItem(result)}
              >
                <Link href={{ pathname: result }} className='hover:cursor-pointer'>
                  {result}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isPending && (
        <div className='absolute right-0 top-0 bottom-0 sm:flex items-center justify-center hidden'>
          <PendingIcon hidden={!isPending} />
        </div>
      )}

      <div className='block sm:hidden' hidden={dialogOpen}>
        <Image
          src={MagnifyingGlass}
          onClick={() => setDialogOpen(true)}
          alt='Search'
          className='mr-3 h-5 w-5 text-grey'
          aria-hidden='true'
        />
        <div className='p-0 sm:hidden block w-96 -mt-52 mx-auto'>
          <div>
            <input
              name='search'
              className='h-11 px-1'
              spellCheck={false}
              disabled={disabled}
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
              placeholder='Search ENS or 0x address…'
              autoComplete='off'
              ref={clickAwayRef}
            />
            {isPending && (
              <div className='absolute right-0 top-0 bottom-0 flex items-center justify-center'>
                <PendingIcon hidden={!isPending} />
              </div>
            )}
          </div>
          <div
            className={`hidden absolute top-full mt-2 left-0 sm:${
              dropdownMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div
              className='w-96 mx-auto min-w-full text-lg py-0 sm:hidden block max-h-56 bg-slate-50'
              ref={clickAwayRef}
              onFocusCapture={event => {
                event.preventDefault()
                event.stopPropagation()
                searchBarRef.current?.focus()
              }}
            >
              {searchResult?.map((result, index) => (
                <div
                  key={`${result}`}
                  className='w-full text-md py-0 hover:bg-pink-50'
                  tabIndex={0 + 1}
                  onClick={() => {
                    setSelectedItem(result)
                    setDialogOpen(false)
                  }}
                >
                  <Link href={{ pathname: result }} className='hover:cursor-pointer'>
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
