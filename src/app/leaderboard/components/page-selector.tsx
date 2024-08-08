import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import ArrowLeft from 'public/assets/icons/arrow-left-leaderboard.svg'

interface PageSelectorProps {
  page: number
  setPage: (page: number) => void
  hasNextPage: boolean
  fetchNext: () => void
  fetchPrevious: () => void
}

const PageSelector: React.FC<PageSelectorProps> = ({
  page,
  setPage,
  hasNextPage,
  fetchNext,
  fetchPrevious
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('query')
  const filter = searchParams.get('filter')

  const handlePageChange = (newPage: number, skipsToFirst?: boolean) => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    if (!skipsToFirst) {
      if (newPage > page) fetchNext()
      else fetchPrevious()
    }

    const params = new URLSearchParams()
    if (filter) params.set('filter', filter)
    if (search) params.set('search', search)
    params.set('page', newPage.toString())
    router.push(`/leaderboard?${params.toString()}`)

    setPage(newPage)
  }

  return (
    <div className='flex gap-2 items-center justify-end px-1'>
      <button
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
        className='text-darkGrey flex items-center justify-center font-semibold hover:opacity-100 h-9 w-9 border-2 border-darkGrey opacity-50 transition-opacity rounded-md disabled:opacity-20'
      >
        <Image src={ArrowLeft} alt='Previous page' width={9} height={12} />
        <Image src={ArrowLeft} alt='Previous page' width={9} height={12} />
      </button>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className='text-darkGrey flex items-center justify-center font-semibold hover:opacity-100 h-9 w-9 border-2 border-darkGrey opacity-50 transition-opacity rounded-md disabled:opacity-20'
      >
        <Image src={ArrowLeft} alt='Previous page' width={8} height={10} />
      </button>
      <p className='text-darkGrey flex items-center justify-center font-semibold h-9 w-9 border-2 border-darkGrey transition-opacity rounded-md'>
        {page}
      </p>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        className='text-darkGrey flex items-center justify-center font-semibold hover:opacity-100 h-9 w-9 border-2 border-darkGrey opacity-50 transition-opacity rounded-md disabled:opacity-20'
      >
        <Image src={ArrowLeft} alt='Next page' width={9} height={12} className='rotate-180' />
      </button>
    </div>
  )
}

export default PageSelector
