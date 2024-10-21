import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { isAddress, type Address } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useAccount } from 'wagmi'
import { resolveEnsAddress } from '#/utils/ens'
import { formatError } from '#/utils/formatError'
import { searchENSNames } from '#/api/searchENSNames'
import { useCart } from '#/contexts/cart-context.tsx'
import { fetchFollowState } from '#/api/fetchFollowState'
import { listOpAddListRecord } from '#/utils/list-ops.ts'
import { useEFPProfile } from '#/contexts/efp-profile-context.tsx'

const useSearch = (isEditor?: boolean) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<undefined | boolean>(undefined)

  // const searchParams = useSearchParams()
  // const initialSearch = searchParams.get('search')
  const [currentSearch, setCurrentSearch] = useState('')
  const [search, setSearch] = useState('')

  const router = useRouter()
  const pathname = usePathname()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()
  const { roles, selectedList } = useEFPProfile()
  const { addCartItem, hasListOpAddRecord, setLoadingCartItems } = useCart()

  const clickAwayRef = useClickAway<HTMLDivElement>(_ => {
    setDropdownMenuOpen(false)
    setDialogOpen(false)
  })
  const searchBarRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // useEffect(() => {
  //   if (initialSearch && initialSearch?.length > 0 && searchBarRef) {
  //     searchBarRef.current?.focus()
  //     searchBarRef.current?.setSelectionRange(initialSearch?.length, initialSearch.length)
  //     setDropdownMenuOpen(true)
  //     setDialogOpen(true)
  //   }
  // }, [searchBarRef])

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

  const searchResult =
    searchResultStatus !== 'pending'
      ? !data || data.length === 0
        ? !(isEditor || isAddress(searchKey)) &&
          (!Number.isNaN(Number(searchKey)) ||
            (searchKey[0] === '#' && !Number.isNaN(Number(searchKey.slice(1)))))
          ? [
              {
                name: `#${searchKey[0] === '#' ? searchKey.slice(1) : searchKey}`,
                resolvedAddress: null
              }
            ]
          : !isEditor && searchKey.includes('.')
            ? [
                {
                  name: searchKey,
                  resolvedAddress: null
                }
              ]
            : isAddress(searchKey)
              ? [
                  {
                    name: searchKey,
                    resolvedAddress: { id: searchKey }
                  }
                ]
              : []
        : data.slice(0, 5)
      : []

  const resetSearch = () => {
    setCurrentSearch('')
    setDropdownMenuOpen(false)
    searchBarRef.current?.blur()
  }

  const getFollowingState = async (address: Address) => {
    const followingStatus = await fetchFollowState({
      address: address,
      userAddress,
      list: selectedList,
      type: 'following'
    })

    if (!followingStatus) return 'none'

    if (followingStatus.state.block) return 'blocks'
    if (followingStatus.state.mute) return 'mutes'
    if (followingStatus.state.follow) return 'follows'

    return 'none'
  }

  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearchEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const term = event?.target.value.toLowerCase()
    if (!isEditor && term.includes(' ')) return
    if (searchTimeout.current) clearTimeout(searchTimeout.current)

    const hasMultipleNames =
      isEditor && (term.includes(',') || term.includes(' ') || term.includes('\n'))
    setDropdownMenuOpen(!hasMultipleNames && term.length > 0)
    setCurrentSearch(term)

    if (!isEditor) {
      if (term) searchTimeout.current = setTimeout(() => setSearch(term), 500)
      else {
        setSearch('')
        router.push(pathname.replace('query=', ''))
      }
    }
  }

  const addToCart = async (user: string) => {
    if (!roles?.isManager) {
      toast.error(t('not manager'))
      return
    }

    const address = isAddress(user) ? user : await resolveEnsAddress(user)

    if (!address) {
      setLoadingCartItems(prevLoading => (prevLoading > 0 ? prevLoading - 1 : prevLoading))
      return { user }
    }

    const followState = await getFollowingState(address)
    const isPendingFollow = hasListOpAddRecord(address)

    if (isPendingFollow) {
      setLoadingCartItems(prevLoading => (prevLoading > 0 ? prevLoading - 1 : prevLoading))
      return { user, isFollowing: false, inCart: true }
    }

    if (followState === 'follows') {
      setLoadingCartItems(prevLoading => (prevLoading > 0 ? prevLoading - 1 : prevLoading))
      return { user, isFollowing: true }
    }

    if (followState === 'none') addCartItem({ listOp: listOpAddListRecord(address) })
  }

  const onSubmit = async () => {
    if (isEditor) {
      resetSearch()
      searchBarRef.current?.focus()

      if (!roles?.isManager) return toast.error(t('not manager'))

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

        setLoadingCartItems(namesToAdd.length)

        const addedToCart = await Promise.all(namesToAdd.map(async name => await addToCart(name)))

        const namesInCart = addedToCart.filter(item => item?.inCart).map(item => item?.user)
        const alreadyFollowed = addedToCart
          .filter(item => item?.isFollowing)
          .map(item => item?.user)
        const erroredNames = addedToCart
          .filter(item => !(item?.inCart || item?.isFollowing) && !!item?.user)
          .map(item => item?.user)

        if (erroredNames.length > 0) toast.error(`${t('unresolved')} ${formatError(erroredNames)}`)
        if (namesInCart.length > 0) toast.error(`${t('in cart')} ${formatError(namesInCart)}`)
        if (alreadyFollowed.length > 0)
          toast.error(`${t('already followed')} ${formatError(alreadyFollowed)}`)

        return setIsAddingToCart(false)
      }

      setLoadingCartItems(1)
      const erroredName = await addToCart(currentSearch)
      if (erroredName?.isFollowing) toast.error(`${t('already followed')} ${erroredName.user}`)
      else if (erroredName?.inCart) toast.error(`${t('in cart')} ${erroredName.user}`)
      else if (erroredName) toast.error(`${t('unresolved')} ${erroredName?.user}`)

      return setIsAddingToCart(false)
    }

    if (
      !Number.isNaN(Number(currentSearch)) ||
      (currentSearch[0] === '#' && !Number.isNaN(Number(currentSearch.slice(1))))
    ) {
      router.push(`/${currentSearch[0] === '#' ? currentSearch.slice(1) : currentSearch}`)
      resetSearch()
    }

    if (isAddress(currentSearch) || currentSearch.includes('.')) {
      const address = isAddress(currentSearch)
        ? currentSearch
        : await resolveEnsAddress(currentSearch)

      router.push(
        `/${address || currentSearch}${isAddress(currentSearch) ? '' : `?search=${currentSearch}`}`
      )
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
    isAddingToCart,
    dropdownMenuOpen,
    handleSearchEvent,
    setDropdownMenuOpen
  }
}

export default useSearch
