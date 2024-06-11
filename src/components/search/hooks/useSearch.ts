import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useQueryState } from 'next-usequerystate'
import { useCallback, useMemo, useRef, useState } from 'react'

import searchENSNames from '#/api/searchENSNames'
import { useRouter } from 'next/navigation'
import { isAddress, type Address } from 'viem'
import { useCart } from '#/contexts/cart-context.tsx'
import { listOpAddListRecord } from '#/utils/list-ops.ts'
import { resolveENSAddress } from '#/utils/resolveAddress.ts'
import { useEFPProfile } from '#/contexts/efp-profile-context.tsx'

const useSearch = (isEditor?: boolean) => {
  const router = useRouter()

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

  const searchKey = useMemo(
    () => (isEditor ? currentSearch : search),
    [isEditor, search, currentSearch]
  )

  const {
    data,
    status: searchResultStatus,
    isLoading
  } = useQuery({
    queryKey: ['ens-subgraph-search', { seaarch: searchKey }],
    queryFn: async () => await searchENSNames({ search: searchKey ?? '' }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: Boolean(searchKey && searchKey.length > 0)
  })

  const { following, roles } = useEFPProfile()
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
      if (!isEditor) searchTimeout = setTimeout(() => setSearch(term), 500)
    },
    [searchTimeout]
  )

  const resetSearch = () => {
    setCurrentSearch('')
    setDropdownMenuOpen(false)
    searchBarRef.current?.blur()
  }

  const addToCart = async (user: string) => {
    if (!roles?.isManager) return

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

  return {
    router,
    searchBarRef,
    dropdownMenuOpen,
    dialogOpen,
    clickAwayRef,
    currentSearch,
    search,
    isLoading,
    searchResult,
    handleSearchEvent,
    resetSearch,
    addToCart,
    onSubmit,
    setDropdownMenuOpen,
    setDialogOpen
  }
}

export default useSearch
