import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

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
    setBlockingSearch,
    fetchMoreBlockedBy,
    setBlockedBySearch,
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
  const { t } = useTranslation()

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
        key={'Blocked/Muted'}
        isLoading={blockingIsLoading}
        results={displayedBlocking}
        allTags={displayedBlockingTags}
        tagsLoading={blockingTagsLoading}
        selectedTags={blockingTagsFilter}
        toggleSelectedTags={toggleTag}
        setSelectedTags={setBlockingTagsFilter}
        sort={blockingSort}
        setSort={setBlockingSort}
        setSearchFilter={setBlockingSearch}
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
        key={'Blocked/Muted By'}
        isLoading={blockedByIsLoading}
        results={blockedBy}
        allTags={displayedBlockedByTags}
        tagsLoading={blockedByIsLoading}
        selectedTags={blockedByTagsFilter}
        setSelectedTags={setBlockedByTagsFilter}
        toggleSelectedTags={toggleTag}
        sort={blockedBySort}
        setSort={setBlockedBySort}
        setSearchFilter={setBlockedBySearch}
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
          className='absolute cursor-pointer z-50 hover:opacity-90 rounded-2xl bg-white/90 hover:scale-110 transition-all dark:bg-[#444444]/90 p-2 -top-[18px] right-1'
        >
          <IoClose className='text-2xl' />
        </div>
        <div className='bg-white/80 dark:bg-darkGrey/80 h-fit rounded-2xl w-full hidden xl:block'>
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
            setSearchFilter={setBlockingSearch}
            isFetchingMore={isFetchingMoreBlocking}
            fetchMore={() => fetchMoreBlocking()}
            canEditTags={isManager}
            showTagsByDefault={true}
            isShowingBlocked={true}
            title='Blocked/Muted'
            customClass='hidden xl:flex min-w-[600px] max-w-[47.5%]'
          />
        </div>
        <div className='bg-white/80 dark:bg-darkGrey/80 h-fit w-full rounded-2xl hidden xl:block'>
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
            setSearchFilter={setBlockedBySearch}
            isFetchingMore={isFetchingMoreBlockedBy}
            fetchMore={() => fetchMoreBlockedBy()}
            showTagsByDefault={true}
            isShowingBlocked={true}
            title='Blocked/Muted By'
            customClass='hidden xl:flex min-w-[600px] max-w-[47.5%]'
          />
        </div>
        <div className='w-full mt-12 relative bg-white/80 dark:bg-darkGrey/80 h-fit rounded-2xl xl:hidden'>
          <div className='w-full absolute -top-[50px] left-0 '>
            {BLOCKED_MUTED_TABS.map(option => (
              <button
                key={option}
                onClick={() => setActiveTab(option as BlockedMutedTabType)}
                className={`w-1/2 capitalize text-lg py-2 font-bold glass-card border-[3px] border-zinc-200 dark:border-zinc-500 rounded-t-lg ${
                  activeTab === option
                    ? 'bg-white/60 dark:bg-white/20'
                    : 'bg-white/20 hover:bg-white/40 dark:bg-darkGrey/20 dark:hover:bg-white/10'
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
