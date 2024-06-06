'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useRef, useState } from 'react'

import searchENSNames from '#/api/fetchEnsName.ts'
import LoadingSpinner from './loading-spinner.tsx'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass.svg'
import { useRouter } from 'next/navigation'
import { isAddress, type Address } from 'viem'
import { useCart } from '#/contexts/cart-context.tsx'
import { listOpAddListRecord } from '#/utils/list-ops.ts'
import { resolveENSAddress } from '#/utils/resolveAddress.ts'
import { useEFPProfile } from '#/contexts/efp-profile-context.tsx'

export function Search({
  disabled,
  size = 'w-full max-w-[400px]',
  isEditor
}: { disabled?: boolean; size?: string; isEditor?: boolean }) {
  const router = useRouter()
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
    enabled: Boolean(search && search.length > 0)
  })

  const { following } = useEFPProfile()
  const { addCartItem, hasListOpAddRecord } = useCart()

  const getFollowingState = (address: Address) => {
    if (!following) return 'none'

    const followingItem = following?.find(
      follower => follower?.data?.toLowerCase() === address?.toLowerCase()
    )
    if (!followingItem) return 'none'

    if (followingItem.tags.includes('Blocked')) return 'blocks'
    if (followingItem.tags.includes('Muted')) return 'mutes'

    return 'follows'
  }

  const searchResult = searchResultStatus === 'success' ? data : []

  let searchTimeout: NodeJS.Timeout | null = null

  const handleSearchEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event?.target.value.includes(' ')) return
      if (searchTimeout) clearTimeout(searchTimeout)
      const term = event?.target.value
      setDropdownMenuOpen(term.length > 0)
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

  const addToCart = async (user: string) => {
    const address = isAddress(user) ? user : await resolveENSAddress(user)

    if (!address) return

    const followState = getFollowingState(address)
    const isPendingFollow = hasListOpAddRecord(address)

    resetSearch()

    if (isPendingFollow) return
    if (followState === 'follows') return
    if (followState === 'none') return addCartItem({ listOp: listOpAddListRecord(address) })
  }

  const onSubmit = () => {
    if (isEditor) return addToCart(currentSearch)

    if (isAddress(currentSearch) || currentSearch.includes('.')) {
      router.push(`/${currentSearch}`)
      resetSearch()
    }
  }

  return (
    <div className={`relative z-50 ${size}`} ref={clickAwayRef}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='rounded-md hidden gap-2 md:flex'>
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
          onKeyDown={e => {
            if (e.key === 'Enter') onSubmit()
          }}
          onClick={event => {
            event.preventDefault()
            setDropdownMenuOpen(
              event.currentTarget.value.length >= 3 &&
                !!search &&
                search.length >= 3 &&
                !!searchResult
            )
          }}
          className='h-12 block w-full pr-12 truncate font-medium rounded-xl border-2 border-gray-200 pl-4 text-xs sm:text-sm bg-white/70'
        />
        <div
          className='pointer-events-none absolute inset-y-0 right-2 flex items-center'
          aria-hidden='true'
        >
          <Image
            src={MagnifyingGlass}
            alt='Search'
            className={`${isEditor ? 'mr-24' : 'mr-3'} h-5 w-5 text-grey`}
            aria-hidden='true'
          />
        </div>
        {isEditor && (
          <button
            className='bg-gradient-to-b font-semibold py-3 px-6 from-kournikova-300 rounded-full to-salmon-400 text-black h-auto'
            onClick={() => addToCart(currentSearch)}
          >
            {t('add')}
          </button>
        )}
      </div>
      <div
        className={` absolute glass-card p-4 w-full shadow-md border-2 border-gray-200 bg-white/95 rounded-xl top-full mt-2 left-0`}
        style={{
          display: dropdownMenuOpen ? 'block' : 'none'
        }}
      >
        <div
          className='w-full items-start text-lg flex-col hidden md:flex'
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
          {searchResult.map((result, index) => (
            <p
              key={result}
              onClick={() => {
                if (isEditor) addToCart(result)
                else router.push(`/${result}`)
                resetSearch()
              }}
              className='max-w-full  truncate text-md hover:opacity-75 cursor-pointer transition-opacity'
            >
              {result}
            </p>
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
              onSubmit={onSubmit}
              value={currentSearch}
              onKeyDown={e => {
                if (e.key === 'Enter') onSubmit()
              }}
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
              {searchResult.map(result => (
                <div
                  key={`${result}`}
                  onClick={() => {
                    if (isEditor) addToCart(result)
                    else router.push(`/${result}`)
                    resetSearch()
                  }}
                  className='max-w-full truncate text-md hover:opacity-75 cursor-pointer transition-opacity'
                >
                  {result}
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
