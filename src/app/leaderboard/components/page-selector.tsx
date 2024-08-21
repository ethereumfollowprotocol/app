import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import ArrowLeft from 'public/assets/icons/arrow-left-leaderboard.svg'

interface PageSelectorProps {
  page: number
  setPage: (page: number) => void
  hasNextPage: boolean
  fetchNext?: () => void
  fetchPrevious?: () => void
  hasSkipToFirst?: boolean
  adjustUrl?: boolean
  displayPageNumber?: boolean
}

const PageSelector: React.FC<PageSelectorProps> = ({
  page,
  setPage,
  hasNextPage,
  fetchNext,
  fetchPrevious,
  hasSkipToFirst = true,
  adjustUrl = true,
  displayPageNumber = true
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const filter = searchParams.get('filter')

  const handlePageChange = (newPage: number, skipsToFirst?: boolean) => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    if (!skipsToFirst && fetchNext && fetchPrevious) {
      if (newPage > page) fetchNext()
      else fetchPrevious()
    }

    if (adjustUrl) {
      const params = new URLSearchParams()
      if (filter) params.set('filter', filter)
      if (search) params.set('search', search)
      params.set('page', newPage.toString())
      router.push(`/leaderboard?${params.toString()}`)
    }

    setPage(newPage)
  }

  return (
    <div className='flex gap-2 items-center justify-end px-1'>
      {hasSkipToFirst && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className='text-darkGrey glass-card flex items-center hover:scale-110 disabled:hover:scale-100 justify-center font-semibold group hover:border-opacity-100 h-9 w-9 border-[3px] border-darkGrey border-opacity-40 transition-all rounded-[10px] disabled:border-opacity-10'
        >
          <Image
            src={ArrowLeft}
            alt='Previous page'
            width={9}
            height={12}
            className='group-hover:opacity-100 opacity-40 group-disabled:opacity-10'
          />
          <Image
            src={ArrowLeft}
            alt='Previous page'
            width={9}
            height={12}
            className='group-hover:opacity-100 opacity-40 group-disabled:opacity-10'
          />
        </button>
      )}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className='text-darkGrey glass-card flex items-center hover:scale-110 disabled:hover:scale-100 justify-center font-semibold group hover:border-opacity-100 h-9 w-9 border-[3px] border-darkGrey border-opacity-40 transition-all rounded-[10px] disabled:border-opacity-10'
      >
        <Image
          src={ArrowLeft}
          alt='Previous page'
          width={9}
          height={12}
          className='group-hover:opacity-100 opacity-40 group-disabled:opacity-10'
        />
      </button>
      {displayPageNumber && (
        <p className='text-darkGrey glass-card flex items-center justify-center font-semibold h-9 w-9 border-[3px] border-darkGrey transition-opacity rounded-[10px]'>
          {page}
        </p>
      )}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        className='text-darkGrey glass-card flex items-center hover:scale-110 disabled:hover:scale-100 justify-center font-semibold group hover:border-opacity-100 h-9 w-9 border-[3px] border-darkGrey border-opacity-40 transition-all rounded-[10px] disabled:border-opacity-10'
      >
        <Image
          src={ArrowLeft}
          alt='Next page'
          width={9}
          height={12}
          className='rotate-180 group-hover:opacity-100 opacity-40 group-disabled:opacity-10'
        />
      </button>
    </div>
  )
}

export default PageSelector
