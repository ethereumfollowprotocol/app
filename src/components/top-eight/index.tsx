import type { Address } from 'viem'
import { FaRegEdit } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { IoIosArrowDown } from 'react-icons/io'

import { cn } from '#/lib/utilities'
import EditModal from './components/edit-modal'
import LoadingCell from '../loaders/loading-cell'
import { useTopEight } from './hooks/use-top-eight'
import TopEightProfile from './components/top-eight-profile'

interface TopEightProps {
  user: Address | string
  isConnectedUserProfile?: boolean
}

const TopEight: React.FC<TopEightProps> = ({ user, isConnectedUserProfile }) => {
  const {
    topEight,
    displayLimit,
    editModalOpen,
    setDisplayLimit,
    setEditModalOpen,
    topEightIsLoading,
    topEightIsRefetching,
  } = useTopEight(user)
  const { t } = useTranslation()

  const isTopEightLoading = topEightIsLoading || topEightIsRefetching
  const isTopEightEmpty = topEight.length === 0 && !isTopEightLoading

  return (
    <>
      {isConnectedUserProfile && editModalOpen && (
        <EditModal profiles={topEight || []} onClose={() => setEditModalOpen(false)} />
      )}
      <div className='glass-card border-grey relative flex w-full flex-col items-center justify-center gap-4 rounded-xl border-[3px] px-5 py-4 xl:w-80 xl:gap-4 2xl:w-[602px] 2xl:px-2'>
        {isConnectedUserProfile && (
          <div
            onClick={() => setEditModalOpen(true)}
            className='text-text-neutral hover:text-text/70 absolute top-2 right-2.5 flex cursor-pointer items-center gap-1 text-sm font-semibold transition-all hover:scale-110'
          >
            <FaRegEdit />
            <p>{t('edit')}</p>
          </div>
        )}
        <div
          className={cn('flex items-center justify-center gap-2 font-bold', isConnectedUserProfile ? 'mt-4' : 'mt-2')}
        >
          <h3 className='text-2xl'>{t('top eight title')}</h3>
        </div>
        {isTopEightEmpty && (
          <p className='text-text my-16 text-center text-lg font-medium italic'>{t('no top eight')}</p>
        )}
        <div className='flex w-full flex-wrap items-start justify-around transition-none sm:justify-between sm:gap-1 xl:gap-0 2xl:justify-start'>
          {!isTopEightLoading &&
            topEight.slice(0, displayLimit).map((profile, index) => <TopEightProfile profile={profile} key={index} />)}
          {new Array(isTopEightLoading ? displayLimit : 0).fill(0).map((_, index) => (
            <div key={index} className='flex w-28 flex-col items-center gap-2 px-0 py-4 xl:w-[128px] 2xl:w-36'>
              <LoadingCell className='h-[50px] w-[50px] rounded-full' />
              <LoadingCell className='h-7 w-24 rounded-sm' />
              <LoadingCell className='h-9 w-[110px] rounded-sm 2xl:h-10 2xl:w-[120px]' />
            </div>
          ))}
        </div>
        {topEight.length > displayLimit && (
          <div
            className='text-text/80 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-[3px] p-2 text-2xl font-semibold lg:hidden'
            onClick={() => setDisplayLimit(displayLimit >= 8 ? 2 : 8)}
          >
            <IoIosArrowDown className={cn('transition-transform', displayLimit >= 8 && 'rotate-180')} />
          </div>
        )}
      </div>
    </>
  )
}

export default TopEight
