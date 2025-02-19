import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import EditModal from './components/edit-modal'
import { useTopEight } from './hooks/use-top-eight'
import Edit from 'public/assets/icons/ui/edit.svg'
import ArrowDown from 'public/assets/icons/ui/arrow-down.svg'
import type { UserProfilePageTableProps } from '../profile-page-table'
import TopEightLoadingProfile from './components/top-eight-loading-profile'
import TopEightProfile from './components/top-eight-profile'

interface TopEightProps {
  user: Address | string
  isConnectedUserProfile?: boolean
  followingListProps: UserProfilePageTableProps
}

const TopEight: React.FC<TopEightProps> = ({ user, isConnectedUserProfile, followingListProps }) => {
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
        <EditModal
          profiles={topEight || []}
          onClose={() => setEditModalOpen(false)}
          followingListProps={followingListProps}
        />
      )}
      <div className='flex w-full flex-col items-center justify-center gap-4 rounded-sm lg:w-80 lg:gap-4 xl:w-[602px]'>
        <div className='bg-neutral shadow-medium flex w-full items-center justify-between rounded-sm p-4'>
          <h3 className='text-xl font-bold'>{t('top eight title')}</h3>
          {isConnectedUserProfile && (
            <button onClick={() => setEditModalOpen(true)} className='transition-all hover:scale-110'>
              <Edit className='h-5 w-5' />
            </button>
          )}
        </div>
        {isTopEightEmpty && (
          <p className='bg-neutral shadow-medium w-full rounded-sm py-[76px] text-center text-lg font-medium italic'>
            {t('no top eight')}
          </p>
        )}
        <div className='flex w-full flex-wrap items-start justify-start gap-2 transition-none'>
          {!isTopEightLoading &&
            topEight.slice(0, displayLimit).map((profile, index) => <TopEightProfile profile={profile} key={index} />)}
          {new Array(isTopEightLoading ? displayLimit : 0).fill(0).map((_, index) => (
            <TopEightLoadingProfile key={index} />
          ))}
        </div>
        {topEight.length > displayLimit && (
          <div
            className='bg-neutral hover:bg-nav-item shadow-medium flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm p-2 text-2xl font-semibold transition-colors lg:hidden'
            onClick={() => setDisplayLimit(displayLimit >= 8 ? 2 : 8)}
          >
            <ArrowDown className={cn('h-auto w-6 transition-transform', displayLimit >= 8 && 'rotate-180')} />
          </div>
        )}
      </div>
    </>
  )
}

export default TopEight
