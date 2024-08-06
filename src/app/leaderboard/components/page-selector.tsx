import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import ArrowDown from 'public/assets/icons/arrow-down.svg'

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

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    if (newPage > page) fetchNext()
    else fetchPrevious()

    const params = new URLSearchParams()
    if (filter) params.set('filter', filter)
    if (search) params.set('search', search)
    params.set('page', newPage.toString())
    router.push(`/leaderboard?${params.toString()}`)

    setPage(newPage)
  }

  return (
    <div className='flex w-full items-center justify-between px-1'>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className=' text-darkGrey flex items-center gap-1 font-semibold hover:opacity-75 transition-opacity rounded-md disabled:opacity-50'
      >
        <Image src={ArrowDown} alt='Previous page' width={14} height={14} className='rotate-90' />
        Previous
      </button>
      <p className='text-darkGrey font-semibold'>{`Page ${page}`}</p>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        className=' text-darkGrey flex items-center gap-1 font-semibold hover:opacity-75 transition-opacity rounded-md disabled:opacity-50'
      >
        Next
        <Image src={ArrowDown} alt='Next page' width={14} height={14} className='-rotate-90' />
      </button>
    </div>
  )
}

export default PageSelector
