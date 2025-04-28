import { isAddress } from 'viem'
import { useQuery } from '@tanstack/react-query'
import { useClickAway } from '@uidotdev/usehooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { SECOND } from '#/lib/constants'
import { resolveEnsAddress } from '#/utils/ens'
import { searchENSNames } from '#/api/search-ens-names'

const useSearch = () => {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<undefined | boolean>(undefined)

  const [search, setSearch] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')

  const router = useRouter()
  const pathname = usePathname()

  const clickAwayRef = useClickAway<HTMLDivElement>((_) => {
    setDropdownMenuOpen(false)
    setDialogOpen(false)
  })
  const searchBarRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (dialogOpen) searchBarRef.current?.focus()
  }, [dialogOpen])

  const {
    data,
    status: searchResultStatus,
    isLoading,
  } = useQuery({
    queryKey: ['ens-subgraph-search', { search }],
    queryFn: async () => await searchENSNames({ search }),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: Boolean(search && search.length > 0),
  })

  const searchResult = useMemo(() => {
    if (searchResultStatus === 'pending') return []

    if (data && data.length > 0) return data.slice(0, 5)

    if (
      isAddress(search) &&
      (!Number.isNaN(Number(search)) || (search[0] === '#' && !Number.isNaN(Number(search.slice(1)))))
    ) {
      return [
        {
          name: `#${search[0] === '#' ? search.slice(1) : search}`,
          resolvedAddress: null,
        },
      ]
    }

    if (isAddress(search)) {
      return [
        {
          name: search,
          resolvedAddress: { id: search },
        },
      ]
    }

    if (search.includes('.')) {
      return [
        {
          name: search,
          resolvedAddress: { id: async () => await resolveEnsAddress(search) },
        },
      ]
    }

    return []
  }, [data, search, searchResultStatus])

  const resetSearch = () => {
    setCurrentSearch('')
    setDialogOpen(false)
    setDropdownMenuOpen(false)
    searchBarRef.current?.blur()
  }

  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearchEvent = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const term = event?.target.value.toLowerCase()
    if (term.includes(' ')) return
    if (searchTimeout.current) clearTimeout(searchTimeout.current)

    setDropdownMenuOpen(term.length > 1)
    setCurrentSearch(term)

    if (term) searchTimeout.current = setTimeout(() => setSearch(term), 0.5 * SECOND)
    else {
      setSearch('')
      router.push(pathname.replace('query=', ''))
    }
  }

  const onSubmit = async () => {
    if (
      !Number.isNaN(Number(currentSearch)) ||
      (currentSearch[0] === '#' && !Number.isNaN(Number(currentSearch.slice(1))))
    ) {
      router.push(`/${currentSearch[0] === '#' ? currentSearch.slice(1) : currentSearch}?ssr=false`)
      resetSearch()
    }

    if (isAddress(currentSearch) || currentSearch.includes('.')) {
      const address = isAddress(currentSearch) ? currentSearch : await resolveEnsAddress(currentSearch)

      router.push(
        `/${address || currentSearch}${isAddress(currentSearch) ? '?ssr=false' : `?search=${currentSearch}&ssr=false`}`
      )
      resetSearch()
    }
  }

  return {
    router,
    search,
    onSubmit,
    isLoading,
    dialogOpen,
    resetSearch,
    clickAwayRef,
    searchBarRef,
    searchResult,
    setDialogOpen,
    currentSearch,
    dropdownMenuOpen,
    handleSearchEvent,
    setDropdownMenuOpen,
  }
}

export default useSearch
