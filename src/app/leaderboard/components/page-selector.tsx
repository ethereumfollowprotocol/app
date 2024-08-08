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
  // const [pageValue, setPageValue] = useState(page.toString())

  // useEffect(() => {
  //   setPageValue(page.toString())
  // }, [page])

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
        className='text-darkGrey glass-card flex items-center justify-center font-semibold hover:opacity-100 h-9 w-9 border-2 border-darkGrey opacity-40 transition-opacity rounded-[10px] disabled:opacity-10'
      >
        <Image src={ArrowLeft} alt='Previous page' width={9} height={12} />
        <Image src={ArrowLeft} alt='Previous page' width={9} height={12} />
      </button>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className='text-darkGrey glass-card flex items-center justify-center font-semibold hover:opacity-100 h-9 w-9 border-2 border-darkGrey opacity-40 transition-opacity rounded-[10px] disabled:opacity-10'
      >
        <Image src={ArrowLeft} alt='Previous page' width={9} height={12} />
      </button>
      <p className='text-darkGrey glass-card flex items-center justify-center font-semibold h-9 w-9 border-2 border-darkGrey transition-opacity rounded-[10px]'>
        {page}
      </p>
      {/* <input
        type='number'
        placeholder='1'
        value={pageValue}
        onChange={e => {
          const value = e.target.value
          setPageValue(value)
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handlePageChange(Number(Number(pageValue) > 0 ? Number(pageValue) : 1), true)
          }
        }}
        className={`text-darkGrey flex items-center text-center bg-transparent justify-center font-semibold h-9 w-[${
          36 + (pageValue.length - 1) * 10
        }px] border-2 border-darkGrey transition-opacity rounded-md`}
      /> */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        className='text-darkGrey glass-card flex items-center justify-center font-semibold hover:opacity-100 h-9 w-9 border-2 border-darkGrey opacity-40 transition-opacity rounded-[10px] disabled:opacity-10'
      >
        <Image src={ArrowLeft} alt='Next page' width={9} height={12} className='rotate-180' />
      </button>
    </div>
  )
}

export default PageSelector
