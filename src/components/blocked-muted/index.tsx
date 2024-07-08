import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import Cross from 'public/assets/icons/cross.svg'
import { BLOCKED_MUTED_TABS } from '#/lib/constants'
import type { BlockedMutedTabType } from '#/types/common'
import { UserProfilePageTable } from '../profile-page-table'
import type { ProfileDetailsResponse } from '#/types/requests'
import useBlockedMuted, { TAGS } from './hooks/use-blocked-muted'

interface BlockedMutedProps {
  profile: ProfileDetailsResponse
  list?: string | number
  isManager?: boolean
  onClose: () => void
}

const BlockedMuted: React.FC<BlockedMutedProps> = ({ profile, list, isManager, onClose }) => {
  const [activeTab, setActiveTab] = useState<BlockedMutedTabType>('Blocked/Muted')

  const blockedMutedRef = useClickAway<HTMLDivElement>(() => {
    onClose()
  })

  const {
    blocking,
    blockedBy,
    blockedByIsLoading,
    blockingIsLoading,
    fetchMoreBlockedBy,
    fetchMoreBlocking,
    isFetchingMoreBlockedBy,
    isFetchingMoreBlocking,
    blockingTagsFilter,
    blockedByTagsFilter,
    blockingSort,
    setBlockingSort,
    blockedBySort,
    setBlockedBySort,
    toggleTag
  } = useBlockedMuted(profile.address, list)
  const { t } = useTranslation('profile')

  const mobileActiveEl = {
    'Blocked/Muted': (
      <UserProfilePageTable
        isLoading={blockingIsLoading}
        results={blocking}
        allTags={TAGS}
        selectedTags={blockingTagsFilter}
        toggleSelectedTags={toggleTag}
        sort={blockingSort}
        setSort={setBlockingSort}
        isFetchingMore={isFetchingMoreBlocking}
        fetchMore={() => fetchMoreBlocking()}
        canEditTags={isManager}
        showTagsByDefault={true}
        isShowingBlocked={true}
        title='Blocked/Muted'
        customClass='border-t-0 rounded-t-none'
      />
    ),
    'Blocked/Muted By': (
      <UserProfilePageTable
        isLoading={blockedByIsLoading}
        results={blockedBy}
        allTags={TAGS}
        selectedTags={blockedByTagsFilter}
        toggleSelectedTags={toggleTag}
        sort={blockedBySort}
        setSort={setBlockedBySort}
        isFetchingMore={isFetchingMoreBlockedBy}
        fetchMore={() => fetchMoreBlockedBy()}
        showTagsByDefault={true}
        isShowingBlocked={true}
        title='Blocked/Muted By'
        customClass='border-t-0 rounded-t-none'
      />
    )
  }[activeTab]

  return (
    <div className='fixed z-50 top-0 flex overflow-scroll justify-center left-0 w-full h-full bg-black/50'>
      <div
        ref={blockedMutedRef}
        className='gap-6 2xl:gap-8 relative flex h-fit rounded-xl mt-[85px] md:mt-24 mb-24 w-full xl:w-fit px-4 md:px-6 lg:mt-32 '
      >
        <div
          onClick={onClose}
          className='absolute cursor-pointer hover:opacity-80 rounded-2xl bg-white/80 p-4 -top-[70px] right-6'
        >
          <Image src={Cross} alt='close blocked and muted list' className='h-6 w-6' />
        </div>
        <div className='bg-white/80 h-fit rounded-2xl w-full hidden xl:block'>
          <UserProfilePageTable
            isLoading={blockingIsLoading}
            results={blocking}
            allTags={TAGS}
            selectedTags={blockingTagsFilter}
            toggleSelectedTags={toggleTag}
            sort={blockingSort}
            setSort={setBlockingSort}
            isFetchingMore={isFetchingMoreBlocking}
            fetchMore={() => fetchMoreBlocking()}
            canEditTags={isManager}
            showTagsByDefault={true}
            isShowingBlocked={true}
            title='Blocked/Muted'
            customClass='hidden xl:flex min-w-[600px] max-w-[47.5%]'
          />
        </div>
        <div className='bg-white/80 h-fit w-full rounded-2xl hidden xl:block'>
          <UserProfilePageTable
            isLoading={blockedByIsLoading}
            results={blockedBy}
            allTags={TAGS}
            selectedTags={blockedByTagsFilter}
            toggleSelectedTags={toggleTag}
            sort={blockedBySort}
            setSort={setBlockedBySort}
            isFetchingMore={isFetchingMoreBlockedBy}
            fetchMore={() => fetchMoreBlockedBy()}
            showTagsByDefault={true}
            isShowingBlocked={true}
            title='Blocked/Muted By'
            customClass='hidden xl:flex min-w-[600px] max-w-[47.5%]'
          />
        </div>
        <div className='w-full mt-12 relative bg-white/80 h-fit rounded-2xl xl:hidden'>
          <div className='w-full absolute -top-12 left-0 '>
            {BLOCKED_MUTED_TABS.map(option => (
              <button
                key={option}
                onClick={() => setActiveTab(option as BlockedMutedTabType)}
                className={`w-1/2 capitalize  text-lg py-2 font-semibold glass-card border-2 border-gray-200 rounded-t-lg ${
                  activeTab === option ? 'bg-white/60' : 'bg-white/20 hover:bg-white/40'
                }`}
              >
                {t(option)}
              </button>
            ))}
          </div>
          {mobileActiveEl}
        </div>
      </div>
    </div>
  )
}

export default BlockedMuted
