'use client'

import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'
import { PendingIcon } from './pending.tsx'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useQueryState } from 'next-usequerystate'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { checkAddressOrEnsValid } from '#lib/utilities.ts'
import { ENS_SUBGRAPH, SECOND } from '#lib/constants/index.ts'
import { IconButton, Dialog, TextField, DropdownMenu } from '@radix-ui/themes'
import { useIsomorphicLayoutEffect } from '#hooks/use-isomorphic-layout-effect.ts'

// autocomplete search suggestions
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
  const pathname = usePathname()
  const searchBarRef = React.useRef<HTMLInputElement>(null)
  const [dropdownMenuOpen, setDropdownMenuOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState<undefined | boolean>(undefined)
  const clickAwayRef = useClickAway<HTMLInputElement>(_ => {
    setDropdownMenuOpen(false)
    setDialogOpen(false)
  })
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const [search, setSearch] = useQueryState('search', {
    throttleMs: SECOND / 2,
    history: 'push'
  })

  const { data, status: searchResultStatus } = useQuery({
    queryKey: ['ens-subgraph-search', { search }],
    queryFn: async () => searchEnsSubgraph({ search: search ?? '' }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: !!search && search.length >= 3
  })

  const searchResult = searchResultStatus === 'success' ? data : []

  useIsomorphicLayoutEffect(() => {
    setDropdownMenuOpen(searchResult.length > 0)
  }, [searchResult, searchResultStatus])

  useIsomorphicLayoutEffect(() => {
    if (pathname.slice(1) === selectedItem) {
      setDropdownMenuOpen(false)
      console.log({ dialogOpen })
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

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /**
     * checking the html element for value to catch an edge case:
     * - when typing a search term then navigating to another page,
     *   the search term is gone from the url but is still in the search input
     */
    const searchTerm = search
    if (!searchTerm) return
    const inputIsValid = checkAddressOrEnsValid(searchTerm)
    if (!inputIsValid) return
  }

  return (
    <form onSubmit={onSubmit} className='w-full max-w-[400px]'>
      <div className='relative max-w-[400px] w-full'>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <div className='rounded-md shadow-sm hidden sm:block'>
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
            className='lowercase h-9 block w-full rounded-xl border-0 border-transparent pl-7 text-xs sm:text-sm bg-white/70'
          />
        </div>
        <div className='hidden sm:block'>
          <DropdownMenu.Root
            modal={false}
            defaultOpen={false}
            open={dropdownMenuOpen}
            onOpenChange={() => setDropdownMenuOpen(searchResult.length > 0)}
          >
            <DropdownMenu.Trigger className='w-full' data-state='closed'>
              <div />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className={clsx(['max-w-xl w-80 min-w-full text-lg py-0 hidden sm:block'])}
              autoFocus={false}
              ref={clickAwayRef}
              hideWhenDetached
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
                  onClick={() => setSelectedItem(result)}
                >
                  <Link href={{ pathname: result }} className='hover:cursor-pointer'>
                    {result}
                  </Link>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
        {isPending && (
          <div className='absolute right-0 top-0 bottom-0 sm:flex items-center justify-center hidden'>
            <PendingIcon hidden={!isPending} />
          </div>
        )}

        <div className='block sm:hidden' hidden={dialogOpen}>
          <Dialog.Root defaultOpen={false} open={dialogOpen}>
            <Dialog.Trigger>
              <IconButton
                variant='soft'
                size='3'
                radius='full'
                className='bg-white'
                onClick={() => setDialogOpen(true)}
              >
                <MagnifyingGlassIcon className='h-6 w-6 text-black' aria-hidden='true' />
              </IconButton>
            </Dialog.Trigger>

            <Dialog.Content className='p-0 sm:hidden block w-96 -mt-52 mx-auto'>
              <TextField.Root>
                <TextField.Input
                  size='3'
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
                <TextField.Slot>
                  {isPending && (
                    <div className='absolute right-0 top-0 bottom-0 flex items-center justify-center'>
                      <PendingIcon hidden={!isPending} />
                    </div>
                  )}
                </TextField.Slot>
              </TextField.Root>
              <DropdownMenu.Root modal={false} defaultOpen={false} open={dropdownMenuOpen}>
                <DropdownMenu.Trigger className='w-full' data-state='closed'>
                  <div />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  className='w-96 mx-auto min-w-full text-lg py-0 sm:hidden block max-h-56 bg-slate-50'
                  autoFocus={false}
                  sticky='always'
                  ref={clickAwayRef}
                  hideWhenDetached
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
                      onClick={() => {
                        setSelectedItem(result)
                        setDialogOpen(false)
                      }}
                    >
                      <Link href={{ pathname: result }} className='hover:cursor-pointer'>
                        {result}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              <label className='sr-only'>Search</label>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </div>
    </form>
  )
}
