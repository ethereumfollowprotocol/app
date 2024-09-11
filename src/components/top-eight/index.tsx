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
  const { t } = useTranslation()
  const {
    editModalOpen,
    setEditModalOpen,
    topEight,
    topEightIsLoading,
    topEightIsRefetching,
    displayLimit,
    setDisplayLimit
  } = useTopEight(user)

  return (
    <>
      {isConnectedUserProfile && editModalOpen && (
        <EditModal profiles={topEight || []} onClose={() => setEditModalOpen(false)} />
      )}
      <div className='glass-card relative xl:w-76 items-center justify-center w-full 2xl:w-86 border-[3px] p-4 2xl:p-6 rounded-xl flex flex-col gap-4 xl:gap-6 border-[#FFDBD9] dark:border-[#a36d7d]'>
        {isConnectedUserProfile && (
          <div
            onClick={() => setEditModalOpen(true)}
            className='absolute top-2 right-2.5 font-semibold text-sm flex gap-1 items-center dark:text-zinc-300 dark:hover:text-zinc-200 text-zinc-500 cursor-pointer hover:text-zinc-400 hover:scale-110 transition-all'
          >
            <FaRegEdit />
            <p>{t('edit')}</p>
          </div>
        )}
        <div className='flex gap-2 font-bold justify-center items-center'>
          <h3 className='text-2xl'>{t('top eight title')}</h3>
        </div>
        {topEight?.length === 0 && !(topEightIsLoading || topEightIsRefetching) && (
          <p className='font-medium italic text-lg my-6 text-center text-zinc-500 dark:text-zinc-300'>
            {t('no top eight')}
          </p>
        )}
        <div className='flex w-full flex-wrap justify-around transition-none sm:justify-evenly xl:justify-between items-start xl:gap-0 sm:gap-2'>
          {!(topEightIsLoading || topEightIsRefetching) &&
            topEight
              ?.slice(0, displayLimit)
              .map((profile, index) => <TopEightProfile profile={profile} key={index} />)}
          {new Array(topEightIsLoading || topEightIsRefetching ? displayLimit : 0)
            .fill(0)
            .map((_, index) => (
              <div key={index} className='flex flex-col w-28 2xl:w-36 py-4 items-center gap-2'>
                <LoadingCell className='h-[60px] w-[60px] rounded-full' />
                <LoadingCell className='h-7 w-24 rounded-lg' />
                <LoadingCell className='h-9 w-[109px] rounded-lg' />
              </div>
            ))}
        </div>
        {topEight.length > displayLimit && (
          <div
            className='text-2xl rounded-xl w-full p-2 justify-center border-[3px] text-[#A1A1AA] border-[#A1A1AA] dark:border-white/95 dark:text-white gap-2 flex lg:hidden font-semibold items-center'
            onClick={() => setDisplayLimit(displayLimit >= 8 ? 2 : 8)}
          >
            {/* <p>{displayLimit >= 8 ? t('view less') : t('view more')}</p> */}
            <IoIosArrowDown
              className={cn('transition-transform', displayLimit >= 8 && 'rotate-180')}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default TopEight
