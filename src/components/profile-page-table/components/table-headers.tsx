import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'
import type { ProfileTableTitleType } from '#/types/common'
import type { FollowSortType, TagCountType } from '#/types/requests'
import { QUERY_BLOCK_TAGS } from '#/components/blocked-muted/hooks/use-blocked-muted'
import { BLOCKED_MUTED_TABS, BLOCKED_MUTED_TAGS, SORT_OPTIONS } from '#/lib/constants'
import Tag from 'public/assets/icons/ui/tag.svg'
import Check from 'public/assets/icons/ui/check.svg'
import Cross from 'public/assets/icons/ui/cross.svg'
import ArrowDown from 'public/assets/icons/ui/arrow-down.svg'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'

interface TableHeaderProps {
  title: ProfileTableTitleType
  search: string
  showTags: boolean
  setShowTags: (input: boolean) => void
  setSearch: (input: string) => void
  allTags?: TagCountType[]
  tagsLoading?: boolean
  selectedTags?: string[]
  sort: FollowSortType
  setSort: (option: FollowSortType) => void
  toggleSelectedTags: (title: ProfileTableTitleType, tag: string) => void
  isShowingBlocked?: boolean
  isTopEight?: boolean
  setActiveTab?: (tab: ProfileTableTitleType) => void
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  showTags,
  setShowTags,
  search,
  setSearch,
  allTags,
  tagsLoading,
  selectedTags,
  toggleSelectedTags,
  sort,
  setSort,
  isShowingBlocked,
  isTopEight,
  setActiveTab,
}) => {
  const [showSort, setShowSort] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const clickAwaySortRef = useClickAway<HTMLDivElement>(() => {
    setShowSort(false)
  })
  const clickAwaySearchRef = useClickAway<HTMLDivElement>(() => {
    setShowSearch(false)
  })

  const { t } = useTranslation()

  const displayedTags = allTags?.filter((tag) => (isShowingBlocked ? true : !QUERY_BLOCK_TAGS.includes(tag.tag)))
  const tagsEmpty = !tagsLoading && (!displayedTags || displayedTags.length === 0)

  return (
    <div className='bg-neutral shadow-medium z-40 flex w-full flex-col gap-4 rounded-sm p-4 py-2 pl-2'>
      <div className='flex w-full justify-between'>
        <div className='flex w-full flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:justify-start'>
          <div className='flex w-full items-center gap-3 sm:w-fit'>
            {BLOCKED_MUTED_TABS.includes(title) || isTopEight ? (
              <h2 className='py-2 pl-2 text-lg font-bold text-nowrap capitalize sm:text-xl'>{t(title)}</h2>
            ) : (
              <div className='bg-grey relative flex w-full items-center rounded-sm sm:w-fit'>
                <div
                  className={cn(
                    'bg-text/10 absolute h-full w-1/2 rounded-sm transition-all duration-200 sm:w-32',
                    title === 'following' ? 'left-0' : 'left-1/2 sm:left-32'
                  )}
                />
                <p
                  className={cn(
                    'text-text z-10 w-1/2 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110 sm:w-32',
                    title === 'following' ? 'text-text' : 'text-text/60'
                  )}
                  onClick={() => setActiveTab?.('following')}
                >
                  {t('following')}
                </p>
                <p
                  className={cn(
                    'text-text z-10 w-1/2 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110 sm:w-32',
                    title === 'followers' ? 'text-text' : 'text-text/60'
                  )}
                  onClick={() => setActiveTab?.('followers')}
                >
                  {t('followers')}
                </p>
              </div>
            )}
          </div>
          <div className='item-center z-10 flex w-full justify-between gap-4 sm:justify-end'>
            {!BLOCKED_MUTED_TABS.includes(title) && (
              <div ref={clickAwaySearchRef} className='relative z-50 flex gap-1 sm:gap-3'>
                <div
                  className='flex h-6 max-w-40 cursor-pointer items-center gap-2'
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <MagnifyingGlass className='h-7 w-auto transition-transform hover:scale-110' />
                  {search && !showSearch && <p className='text-sm font-medium'>{search}</p>}
                  {search && !showSearch && (
                    <Cross
                      onClick={(e: React.MouseEvent<SVGElement>) => {
                        e.stopPropagation()
                        setSearch('')
                        setShowSearch(false)
                      }}
                      className='text-darkGrey -ml-1 h-6 w-auto cursor-pointer rounded-full text-xl opacity-50 transition-all hover:scale-125 hover:opacity-60'
                    />
                  )}
                </div>
                {showSearch && (
                  <input
                    type='text'
                    spellCheck={false}
                    autoFocus={true}
                    autoComplete='off'
                    placeholder={t('search placeholder')}
                    onChange={(e) => {
                      setSearch(e.target.value.toLowerCase().trim())
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Escape') {
                        e.preventDefault()
                        setShowSearch(false)
                      }
                    }}
                    value={search}
                    className='bg-nav-item absolute -top-1 left-[110%] z-50 block w-52 rounded-sm border-0 border-transparent py-1.5 pr-10 pl-3 text-sm font-medium sm:-top-2 sm:right-[110%] sm:py-2.5'
                  />
                )}
              </div>
            )}
            <div className='flex items-center gap-3 sm:gap-4'>
              <div
                onClick={() => setShowTags(!showTags)}
                className='flex cursor-pointer items-center gap-0.5 transition-transform hover:scale-110 sm:gap-1'
              >
                <Tag className='h-auto w-6' />
                <ArrowDown className={`h-auto w-4 transition-transform ${showTags ? 'rotate-180' : ''}`} />
              </div>
              <div
                ref={clickAwaySortRef}
                onClick={() => setShowSort(!showSort)}
                className='relative flex cursor-pointer items-center gap-1'
              >
                <div className='flex items-center gap-1 transition-transform hover:scale-110'>
                  <p className='font-semibold capitalize'>{t(sort)}</p>
                  <ArrowDown className={`h-auto w-4 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                </div>
                {showSort && (
                  <div className='bg-neutral shadow-small absolute top-[120%] -right-2 z-50 flex flex-col items-center gap-1 rounded-sm p-1'>
                    {SORT_OPTIONS.map((option) => (
                      <div
                        className='hover:bg-nav-item relative w-full rounded-sm p-3 pl-8 font-bold text-nowrap capitalize transition-colors'
                        key={option}
                        onClick={() => setSort(option)}
                      >
                        {sort === option && <Check className='absolute top-[17px] left-2 h-auto w-4' />}
                        <p>{t(option)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTags && tagsEmpty && <p className='text-text/40 w-full text-center font-bold italic'>{t('no tags')}</p>}
      {showTags && (
        <div className='flex w-full flex-wrap gap-2'>
          {tagsLoading
            ? new Array(4).fill(1).map((_, i) => <LoadingCell key={i} className='h-7 w-20 rounded-sm md:h-9' />)
            : displayedTags?.map((tag, i) => (
                <button
                  key={tag.tag + i}
                  className={cn(
                    'flex max-w-[33%] items-center gap-1.5 rounded-sm px-4 py-2 text-sm font-bold transition-transform hover:scale-110',
                    selectedTags?.includes(tag.tag)
                      ? 'text-darkGrey bg-zinc-100 shadow-inner shadow-black/10'
                      : 'bg-zinc-300/80 text-zinc-500'
                  )}
                  name={tag.tag.toLowerCase()}
                  onClick={() => toggleSelectedTags(title, tag.tag)}
                >
                  <p className='max-w-[95%] truncate'>{BLOCKED_MUTED_TAGS.includes(tag.tag) ? t(tag.tag) : tag.tag}</p>
                  <p className='text-darkGrey/50'>{formatNumber(tag.count)}</p>
                </button>
              ))}
        </div>
      )}
    </div>
  )
}

export default TableHeader
