import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft
} from 'react-icons/md'
import { useRouter, useSearchParams } from 'next/navigation'

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
  scrollUp
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const filter = searchParams.get('filter')

  const handlePageChange = (newPage: number, skipsToFirst?: boolean) => {
    if (scrollUp) window.scrollTo({ top: window.innerWidth > 786 ? 200 : 400, behavior: 'instant' })

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
        scroll: false
      })
    }

    setPage(newPage)
  }

  return (
    <div className='flex gap-2 items-center justify-end px-1'>
      {hasSkipToFirst && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          aria-label='skip to first page'
          className='glass-card flex items-center hover:scale-110 disabled:hover:scale-100 justify-center font-bold group h-9 w-9 border-[3px] hover:border-text border-text/40 transition-all rounded-[10px] disabled:border-text/10'
        >
          <MdKeyboardDoubleArrowLeft className='w-6 h-6 group-hover:opacity-100 opacity-40 dark:opacity-80 group-disabled:opacity-20 transition-opacity' />
        </button>
      )}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        aria-label='previous page'
        className='glass-card flex items-center hover:scale-110 disabled:hover:scale-100 justify-center font-bold group hover:border-text h-9 w-9 border-[3px] border-text/40 transition-all rounded-[10px] disabled:border-text/10'
      >
        <MdKeyboardArrowLeft className='w-6 h-6 group-hover:opacity-100 opacity-40 dark:opacity-80 group-disabled:opacity-20 transition-opacity' />
      </button>
      {displayPageNumber && (
        <p className='glass-card flex items-center disabled:hover:scale-100 justify-center font-bold group  h-9 w-9 border-[3px] border-text transition-all rounded-[10px]'>
          {page}
        </p>
      )}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        aria-label='next page'
        className='glass-card flex items-center hover:scale-110 disabled:hover:scale-100 justify-center font-bold group hover:border-text h-9 w-9 border-[3px] border-text/40 transition-all rounded-[10px] disabled:border-text/10'
      >
        <MdKeyboardArrowRight className='w-6 h-6 group-hover:opacity-100 opacity-40 dark:opacity-80 group-disabled:opacity-20 transition-opacity' />
      </button>
    </div>
  )
}

export default PageSelector