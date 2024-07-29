import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { isAddress, type Address } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useQueryState } from 'next-usequerystate'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { resolveEnsAddress } from '#/utils/ens'
import searchENSNames from '#/api/searchENSNames'
import { useCart } from '#/contexts/cart-context.tsx'
import fetchFollowState from '#/api/fetchFollowState'
import { listOpAddListRecord } from '#/utils/list-ops.ts'
import { useEFPProfile } from '#/contexts/efp-profile-context.tsx'

const useSearch = (isEditor?: boolean) => {
  const [addToCartError, setAddToCartError] = useState<string>()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<undefined | boolean>(undefined)

  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search')
  const [currentSearch, setCurrentSearch] = useState(initialSearch ?? '')
  const [search, setSearch] = useQueryState('search', {
    history: 'push',
    parse: value => value?.trim().toLowerCase(),
    serialize: value => value.trim().toLowerCase()
  })

  const router = useRouter()
  const { t } = useTranslation('editor')
  const { roles, selectedList } = useEFPProfile()
  const { addCartItem, hasListOpAddRecord } = useCart()
  const { t: tFollowBtn } = useTranslation('common', { keyPrefix: 'follow btn' })

  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setDropdownMenuOpen(false)
    setDialogOpen(false)
  })
  const searchBarRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (initialSearch && initialSearch?.length > 0 && searchBarRef) {
      searchBarRef.current?.focus()
      searchBarRef.current?.setSelectionRange(initialSearch?.length, initialSearch.length)
      setDropdownMenuOpen(true)
      setDialogOpen(true)
    }
  }, [searchBarRef])

  useEffect(() => {
    if (dialogOpen) searchBarRef.current?.focus()
  }, [dialogOpen])

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

  const getFollowingState = async (address: Address) => {
    const followingStatus = await fetchFollowState({
      address: address,
      list: selectedList,
      type: 'following'
    })

    if (!followingStatus) return 'none'

    if (followingStatus.state.block) return 'blocks'
    if (followingStatus.state.mute) return 'mutes'
    if (followingStatus.state.follow) return 'follows'

    return 'none'
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
      toast.error(tFollowBtn('not manager'))
      setAddToCartError(tFollowBtn('not manager'))
      return
    }

    const address = isAddress(user) ? user : await resolveEnsAddress(user)

    if (!address) return { user }

    const followState = await getFollowingState(address)
    const isPendingFollow = hasListOpAddRecord(address)

    if (isPendingFollow) return
    if (followState === 'follows') return { user, isFollowing: true }
    if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
  }

  const onSubmit = async () => {
    if (isEditor) {
      resetSearch()
      searchBarRef.current?.focus()

      if (!roles?.isManager) {
        toast.error(tFollowBtn('not manager'))
        setAddToCartError(tFollowBtn('not manager'))
        return
      }

      setIsAddingToCart(true)

      const hasMultipleNames =
        isEditor &&
        (currentSearch.includes(',') || currentSearch.includes(' ') || currentSearch.includes('\n'))

      if (hasMultipleNames) {
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
      else if (erroredName) setAddToCartError(`${t('unresolved')} ${erroredName?.user}`)

      return setIsAddingToCart(false)
    }

    if (
      isAddress(currentSearch) ||
      currentSearch.includes('.') ||
      !Number.isNaN(Number(currentSearch))
    ) {
      resetSearch()
      const address = isAddress(currentSearch)
        ? currentSearch
        : await resolveEnsAddress(currentSearch)

      router.push(`/${address || currentSearch}`)
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
