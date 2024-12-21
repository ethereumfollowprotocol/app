import { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { BLOCKED_MUTED_TABS } from '#/lib/constants'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import UserProfilePageTable from '../profile-page-table'
import type { BlockedMutedTabType } from '#/types/common'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import useBlockedMuted, { EMPTY_COUNT_TAGS, TAGS } from './hooks/use-blocked-muted'

interface BlockedMutedProps {
  user: string
  list?: string | number
  isManager?: boolean
  onClose: () => void
}

const BlockedMuted: React.FC<BlockedMutedProps> = ({ user, list, isManager, onClose }) => {
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
  } = useBlockedMuted(user, list)
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
  const tableRef = useRef<HTMLDivElement>(null)

  const mobileActiveEl = {
    'Blocked/Muted': (
      <UserProfilePageTable
        ref={tableRef}
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
        ref={tableRef}
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
        className='gap-6 2xl:gap-8 relative flex h-fit rounded-xl mt-[85px] md:mt-24 mb-24 w-full xl:w-fit px-4 md:px-6 lg:mt-28'
      >
        <div
          onClick={onClose}
          className='absolute cursor-pointer z-50 hover:opacity-90 rounded-2xl bg-neutral/90 hover:scale-110 transition-all p-2 -top-[18px] right-1'
        >
          <IoClose className='text-2xl' />
        </div>
        <div className='bg-neutral/80 h-fit rounded-2xl w-full hidden xl:block'>
          <UserProfilePageTable
            ref={tableRef}
            key={'Blocked/Muted'}
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
        <div className='bg-neutral/80 h-fit w-full rounded-2xl hidden xl:block'>
          <UserProfilePageTable
            ref={tableRef}
            key={'Blocked/Muted By'}
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
        <div className='w-full mt-12 relative bg-neutral/80 h-fit rounded-2xl xl:hidden'>
          <div className='w-full absolute -top-[46px] left-0 '>
            {BLOCKED_MUTED_TABS.map(option => (
              <button
                key={option}
                onClick={() => setActiveTab(option as BlockedMutedTabType)}
                className={`w-1/2 capitalize text-lg py-2 font-bold glass-selector border-[3px]  border-grey rounded-t-lg ${
                  activeTab === option ? 'bg-neutral/80 border-b-0' : 'bg-grey/70 hover:bg-grey/80 '
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
