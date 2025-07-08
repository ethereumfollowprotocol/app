'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import DoubleArrowLeft from 'public/assets/icons/ui/double-arrow-left.svg'
import ArrowLeft from 'public/assets/icons/ui/short-arrow-left.svg'
import ArrowRight from 'public/assets/icons/ui/short-arrow-right.svg'
import { cn } from '#/lib/utilities'
import { useGlassTheme } from '#/hooks/use-glass-theme'

interface PageSelectorProps {
  page: number
  setPage: (page: number) => void
  hasNextPage: boolean
  fetchNext?: () => void
  fetchPrevious?: () => void
  hasSkipToFirst?: boolean
  adjustUrl?: boolean
  displayPageNumber?: boolean
  isLoading?: boolean
  scrollUp?: boolean
}

const PageSelector: React.FC<PageSelectorProps> = ({
  page,
  setPage,
  hasNextPage,
  fetchNext,
  fetchPrevious,
  hasSkipToFirst = true,
  adjustUrl = true,
  displayPageNumber = true,
  isLoading,
  scrollUp,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const filter = searchParams.get('filter')
  const { getGlassClass } = useGlassTheme()

  const handlePageChange = (newPage: number, skipsToFirst?: boolean) => {
    if (scrollUp) {
      document
        .getElementById('leaderboard-page')
        ?.scrollTo({ top: window.innerWidth > 786 ? 200 : 400, behavior: 'instant' })
      window.scrollTo({ top: window.innerWidth > 786 ? 200 : 400, behavior: 'instant' })
    }

    if (!skipsToFirst && fetchNext && fetchPrevious && !isLoading) {
      if (newPage > page) fetchNext()
      else fetchPrevious()
    }

    if (adjustUrl) {
      const params = new URLSearchParams()
      if (filter) params.set('filter', filter)
      if (search) params.set('search', search)
      params.set('page', newPage.toString())
      router.push(`/leaderboard?${params.toString()}`, {
        scroll: false,
      })
    }

    setPage(newPage)
  }

  return (
    <div className='flex items-center justify-end gap-2 px-1'>
      {hasSkipToFirst && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          aria-label='skip to first page'
          className={cn(
            getGlassClass('liquid-glass-button', 'group hover:border-text border-text/40 disabled:border-text/10'),
            'flex h-9 w-9 items-center justify-center rounded-sm border-[3px] font-bold transition-all hover:scale-110 disabled:hover:scale-100'
          )}
        >
          <DoubleArrowLeft className='h-6 w-6 opacity-40 transition-opacity group-hover:opacity-100 group-disabled:opacity-20 dark:opacity-80' />
        </button>
      )}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label='previous page'
        className={cn(
          getGlassClass('liquid-glass-button', 'group hover:border-text border-text/40 disabled:border-text/10'),
          'flex h-9 w-9 items-center justify-center rounded-sm border-[3px] font-bold transition-all hover:scale-110 disabled:hover:scale-100'
        )}
      >
        <ArrowLeft className='h-6 w-6 opacity-40 transition-opacity group-hover:opacity-100 group-disabled:opacity-20 dark:opacity-80' />
      </button>
      {displayPageNumber && (
        <p
          className={cn(
            getGlassClass('liquid-glass-button', 'group border-text'),
            'flex h-9 w-9 items-center justify-center rounded-sm border-[3px] font-bold transition-all disabled:hover:scale-100'
          )}
        >
          {page}
        </p>
      )}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        aria-label='next page'
        className={cn(
          getGlassClass('liquid-glass-button', 'group hover:border-text border-text/40 disabled:border-text/10'),
          'flex h-9 w-9 items-center justify-center rounded-sm border-[3px] font-bold transition-all hover:scale-110 disabled:hover:scale-100'
        )}
      >
        <ArrowRight className='h-6 w-6 opacity-40 transition-opacity group-hover:opacity-100 group-disabled:opacity-20 dark:opacity-80' />
      </button>
    </div>
  )
}

export default PageSelector
