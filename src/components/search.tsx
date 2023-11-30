'use client'

import Link from 'next/link'
import * as React from 'react'
import { isAddress } from 'viem'
import { PendingIcon } from './pending.tsx'
import { useQuery } from '@tanstack/react-query'
import { ENS_SUBGRAPH } from '#lib/constants.ts'
import { useThrottle } from '@uidotdev/usehooks'
import { getQueryClient } from '#lib/query-client.ts'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IconButton, Dialog, TextField, DropdownMenu } from '@radix-ui/themes'

// ens min is 3 letters
function validateInput(value: string) {
  return (value.length >= 7 && value.indexOf('.eth') > 0) || isAddress(value)
}

// autocomplete searchsuggestions
async function searchEnsSubgraph({ search }: { search: string }): Promise<Array<string>> {
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
    data: { domains: Array<{ name: string; registration: { registrationDate: string } | null }> }
  }
  return json.data.domains
    .filter(domain => !!domain.registration)
    .map(domain => domain.name)
    .sort((a, b) => a.length - b.length)
}

export function Search({ disabled }: { disabled?: boolean }) {
  const searchBarRef = React.useRef<HTMLInputElement>(null)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const throttledSearchParams = useThrottle(searchParams.get('search'), 400)
  const [isPending, startTransition] = React.useTransition()

  function handleSearch(event?: React.ChangeEvent<HTMLInputElement>) {
    const term = event?.target.value
    const params = new URLSearchParams(window.location.search)
    if (term) params.set('search', term)
    else params.delete('search')

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  // const debounceHandleSearch = React.useCallback(useDebounce(handleSearch, 500), [])

  function onSubmit(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    /**
     * checking the html element for value to catch an edge case:
     * - when typing a search term then navigating to another page,
     *   the search term is gone from the url but is still in the search input
     */
    const searchElement = event?.currentTarget.elements.namedItem('search')
    const domAccessedSearch = searchElement instanceof HTMLInputElement ? searchElement.value : ''

    const search = throttledSearchParams ?? domAccessedSearch
    if (!search) return

    const inputIsValid = validateInput(search)
    if (!inputIsValid) return

    router.push(`/${search}`)
  }

  const { data: searchResult, status: searchResultStatus } = useQuery({
    queryKey: ['ens-subgraph-search', { search: throttledSearchParams }],
    queryFn: async () => searchEnsSubgraph({ search: throttledSearchParams ?? '' }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false
  })

  return (
    <form onSubmit={onSubmit} className='w-full'>
      <div className='relative max-w-[400px] w-full'>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <div className='rounded-md shadow-sm hidden md:block'>
          <div
            className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'
            aria-hidden='true'
          >
            <MagnifyingGlassIcon className='mr-3 h-4 w-4 text-gray-400' aria-hidden='true' />
          </div>
          <input
            ref={searchBarRef}
            type='text'
            id='search'
            name='search'
            spellCheck={false}
            autoComplete='off'
            disabled={disabled}
            placeholder='Search ENS or 0x address…'
            onChange={handleSearch}
            className='lowercase h-9 block w-full rounded-xl border-0 border-transparent pl-7 text-xs sm:text-sm bg-white/70'
          />
        </div>
        <div className='md:hidden'>
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton variant='soft' size='3' radius='full' className='bg-white'>
                <MagnifyingGlassIcon className='h-6 w-6 text-black' aria-hidden='true' />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }} className='p-0'>
              <TextField.Root>
                <TextField.Input
                  size='3'
                  name='search'
                  className='h-11 px-1'
                  spellCheck={false}
                  disabled={disabled}
                  onChange={handleSearch}
                  placeholder='Search ENS or 0x address…'
                />
                <TextField.Slot>
                  {isPending && (
                    <div className='absolute right-0 top-0 bottom-0 flex items-center justify-center'>
                      <PendingIcon hidden={!isPending} />
                    </div>
                  )}
                </TextField.Slot>
              </TextField.Root>
              <label className='sr-only'>Search</label>
            </Dialog.Content>
          </Dialog.Root>
        </div>
        {isPending && (
          <div className='absolute right-0 top-0 bottom-0 sm:flex items-center justify-center hidden'>
            <PendingIcon hidden={!isPending} />
          </div>
        )}
      </div>
      <DropdownMenu.Root modal={false} open={searchResult && searchResult.length > 0}>
        <DropdownMenu.Trigger className='w-full'>
          <div />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          className='max-w-xl w-80 min-w-full text-lg py-0 hidden sm:block'
          autoFocus={false}
          onFocusCapture={event => {
            event.preventDefault()
            event.stopPropagation()
            searchBarRef.current?.focus()
          }}
        >
          {searchResult?.map((result, index) => (
            <DropdownMenu.Item
              key={`${index}`}
              asChild
              className='w-full text-md py-0 hover:bg-pink-50'
              tabIndex={0 + 1}
            >
              <Link href={result} className='hover:cursor-pointer'>
                {result}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </form>
  )
}
