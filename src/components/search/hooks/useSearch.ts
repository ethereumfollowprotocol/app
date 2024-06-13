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
import { useTranslation } from 'react-i18next'

const useSearch = (isEditor?: boolean) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addToCartError, setAddToCartError] = useState<string>()
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<undefined | boolean>(undefined)
  const [currentSearch, setCurrentSearch] = useState('')
  const [search, setSearch] = useQueryState('search', {
    history: 'push',
    parse: value => value?.trim().toLowerCase(),
    serialize: value => value.trim().toLowerCase()
  })

  const router = useRouter()
  const { t } = useTranslation('editor')
  const { following, roles } = useEFPProfile()
  const { addCartItem, hasListOpAddRecord } = useCart()

  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setDropdownMenuOpen(false)
    setDialogOpen(false)
  })
  const searchBarRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

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
  const searchResult = searchResultStatus === 'success' ? data : []

  const resetSearch = () => {
    setCurrentSearch('')
    setDropdownMenuOpen(false)
    searchBarRef.current?.blur()
  }

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

  let searchTimeout: NodeJS.Timeout | null = null

  const handleSearchEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAddToCartError(undefined)

      const term = event?.target.value
      if (!isEditor && term.includes(' ')) return
      if (searchTimeout) clearTimeout(searchTimeout)

      const hasMultipleNames =
        isEditor && (term.includes(',') || term.includes(' ') || term.includes('\n'))
      setDropdownMenuOpen(!hasMultipleNames && term.length > 0)
      setCurrentSearch(term)

      if (!isEditor) searchTimeout = setTimeout(() => setSearch(term), 500)
    },
    [searchTimeout]
  )

  const addToCart = async (user: string) => {
    if (!roles?.isManager) {
      setAddToCartError(t('not manager'))
      return
    }

    const address = isAddress(user) ? user : await resolveENSAddress(user)

    if (!address) return { user }

    const followState = getFollowingState(address)
    const isPendingFollow = hasListOpAddRecord(address)

    resetSearch()

    if (isPendingFollow) return
    if (followState === 'follows') return { user, isFollowing: true }
    if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
  }

  const onSubmit = async () => {
    if (isEditor) {
      if (!roles?.isManager) {
        setAddToCartError(t('not manager'))
        return
      }

      const hasMultipleNames =
        isEditor &&
        (currentSearch.includes(',') || currentSearch.includes(' ') || currentSearch.includes('\n'))

      if (hasMultipleNames) {
        setIsAddingToCart(true)
        const namesToAdd = currentSearch
          .replaceAll(',', ' ')
          .replaceAll('\n', ' ')
          .split(' ')
          .map(name => name.trim())
          .filter(name => !!name)

        const addedToCart = await Promise.all(namesToAdd.map(async name => await addToCart(name)))

        const namesInCart = addedToCart.filter(item => !!item?.isFollowing).map(item => item?.user)
        const erroredNames = addedToCart
          .filter(item => !item?.isFollowing)
          .map(item => item?.user)
          .filter(name => !!name)

        if (erroredNames.length > 0)
          setAddToCartError(`${t('unresolved')} ${erroredNames.join(', ')}`)
        else if (namesInCart.length > 0)
          setAddToCartError(`${t('already followed')} ${namesInCart.join(', ')}`)

        return setIsAddingToCart(false)
      }

      const erroredName = await addToCart(currentSearch)
      if (erroredName?.isFollowing)
        setAddToCartError(`${t('already followed')} ${erroredName.user}`)
      else setAddToCartError(`${t('unresolved')} ${erroredName?.user}`)

      return
    }

    if (isAddress(currentSearch) || currentSearch.includes('.')) {
      router.push(`/${currentSearch}`)
      resetSearch()
    }
  }

  return {
    router,
    search,
    onSubmit,
    addToCart,
    isLoading,
    dialogOpen,
    resetSearch,
    clickAwayRef,
    searchBarRef,
    searchResult,
    setDialogOpen,
    currentSearch,
    addToCartError,
    isAddingToCart,
    dropdownMenuOpen,
    handleSearchEvent,
    setAddToCartError,
    setDropdownMenuOpen
  }
}

export default useSearch
