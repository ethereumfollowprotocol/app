import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import Cross from 'public/assets/icons/cross.svg'
import { BLOCKED_MUTED_TABS } from '#/lib/constants'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import type { BlockedMutedTabType } from '#/types/common'
import { UserProfilePageTable } from '../profile-page-table'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileDetailsResponse } from '#/types/requests'
import useBlockedMuted, { EMPTY_COUNT_TAGS, TAGS } from './hooks/use-blocked-muted'

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

  const isMyProfile = useIsEditView()
  const { selectedList } = useEFPProfile()

  const {
    blocking,
    blockedBy,
    toggleTag,
    blockingTags,
    blockingSort,
    blockedBySort,
    blockedByTags,
    setBlockingSort,
    setBlockedBySort,
    fetchMoreBlocking,
    blockingIsLoading,
    fetchMoreBlockedBy,
    blockedByIsLoading,
    blockingTagsFilter,
    blockedByTagsFilter,
    blockingTagsLoading,
    blockedByTagsLoading,
    setBlockingTagsFilter,
    setBlockedByTagsFilter,
    isFetchingMoreBlocking,
    isFetchingMoreBlockedBy
  } = useBlockedMuted(profile.address, list)
  const { t } = useTranslation('profile')

  const filteredBlockingTags = blockingTags?.tagCounts?.filter(tag => TAGS.includes(tag.tag)) || []
  const displayedBlockingTags = [
    {
      tag: 'All',
      count:
        isMyProfile && !selectedList
          ? 0
          : filteredBlockingTags?.reduce((acc, tag) => acc + tag.count, 0)
    },
    ...(filteredBlockingTags.length > 0
      ? isMyProfile && !selectedList
        ? EMPTY_COUNT_TAGS
        : filteredBlockingTags
      : EMPTY_COUNT_TAGS)
  ]

  const filteredBlockedByTags =
    blockedByTags?.tagCounts?.filter(tag => TAGS.includes(tag.tag)) || []
  const displayedBlockedByTags = [
    { tag: 'All', count: filteredBlockedByTags?.reduce((acc, tag) => acc + tag.count, 0) },
    ...(filteredBlockedByTags.length > 0 ? filteredBlockedByTags : EMPTY_COUNT_TAGS)
  ]

  const displayedBlocking = isMyProfile && !selectedList ? [] : blocking

  const mobileActiveEl = {
    'Blocked/Muted': (
      <UserProfilePageTable
        isLoading={blockingIsLoading}
        results={displayedBlocking}
        allTags={displayedBlockingTags}
        tagsLoading={blockingTagsLoading}
        selectedTags={blockingTagsFilter}
        toggleSelectedTags={toggleTag}
        setSelectedTags={setBlockingTagsFilter}
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
        allTags={displayedBlockedByTags}
        tagsLoading={blockedByIsLoading}
        selectedTags={blockedByTagsFilter}
        setSelectedTags={setBlockedByTagsFilter}
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
            results={displayedBlocking}
            allTags={displayedBlockingTags}
            tagsLoading={blockingTagsLoading}
            selectedTags={blockingTagsFilter}
            setSelectedTags={setBlockingTagsFilter}
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
            allTags={displayedBlockedByTags}
            tagsLoading={blockedByTagsLoading}
            selectedTags={blockedByTagsFilter}
            setSelectedTags={setBlockedByTagsFilter}
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
