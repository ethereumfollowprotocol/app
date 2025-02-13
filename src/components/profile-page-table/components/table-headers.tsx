import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import { IoIosArrowDown } from 'react-icons/io'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import { formatNumber } from '#/utils/format/format-number'
import LoadingCell from '#/components/loaders/loading-cell'
import type { ProfileTableTitleType } from '#/types/common'
import Check from 'public/assets/icons/ui/check.svg'
import type { FollowSortType, TagCountType } from '#/types/requests'
import { QUERY_BLOCK_TAGS } from '#/components/blocked-muted/hooks/use-blocked-muted'
import { BLOCKED_MUTED_TABS, BLOCKED_MUTED_TAGS, SORT_OPTIONS } from '#/lib/constants'

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
    <div className='z-40 flex w-full flex-col gap-4 px-4 sm:px-2'>
      <div className='flex w-full justify-between'>
        <div className='flex w-full flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:justify-start'>
          <div className='flex w-full items-center gap-3 sm:w-fit'>
            {BLOCKED_MUTED_TABS.includes(title) ? (
              <h2 className='hidden text-lg font-bold text-nowrap capitalize sm:text-3xl xl:block'>{t(title)}</h2>
            ) : (
              <div className='bg-grey relative flex w-full items-center rounded-xl sm:w-fit'>
                <div
                  className={cn(
                    'border-grey bg-neutral absolute h-full w-1/2 rounded-xl border-[3px] transition-all duration-200 sm:w-32',
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
          {!BLOCKED_MUTED_TABS.includes(title) && (
            <div ref={clickAwaySearchRef} className='relative z-50 flex gap-1 sm:gap-3'>
              <div
                className={cn(
                  'flex h-6 max-w-40 cursor-pointer items-center gap-2 transition-all hover:opacity-75',
                  search ? 'hover:scale-[1.15]' : 'hover:scale-125'
                )}
                onClick={() => setShowSearch(!showSearch)}
              >
                <FiSearch className='text-2xl opacity-50 transition-opacity hover:opacity-100' />
                <p className='hidden truncate text-sm font-medium sm:block md:hidden lg:block xl:hidden 2xl:block'>
                  {search}
                </p>
              </div>
              {search && (
                <IoClose
                  onClick={() => {
                    setSearch('')
                    setShowSearch(false)
                  }}
                  className='text-darkGrey mt-0.5 cursor-pointer rounded-full bg-zinc-300 p-0.5 text-xl opacity-50 transition-all hover:scale-125 hover:opacity-60'
                />
              )}
              {showSearch && (
                <div className='glass-card bg-neutral border-grey absolute -top-4 left-0 flex h-fit w-64 items-center gap-1 rounded-xl border-[3px] shadow-md xl:-left-10'>
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
                    className='bg-neutral/50 block w-full rounded-sm border-0 border-transparent py-3 pr-10 pl-3 font-medium sm:text-sm'
                  />
                  <div
                    className='pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3'
                    aria-hidden='true'
                  >
                    <FiSearch className='mr-3 text-xl text-zinc-400 dark:text-white/90' aria-hidden='true' />
                  </div>
                </div>
              )}
            </div>
          )}
          <div className='flex justify-end gap-4 sm:w-full'>
            <div
              onClick={() => setShowTags(!showTags)}
              className='flex cursor-pointer items-center gap-1 transition-transform hover:scale-110'
            >
              <p className='text-sm font-bold'>{t('tags')}</p>
              <IoIosArrowDown className={`transition-transform ${showTags ? 'rotate-180' : ''}`} />
            </div>
            <div
              ref={clickAwaySortRef}
              onClick={() => setShowSort(!showSort)}
              className='relative flex cursor-pointer items-center gap-1'
            >
              <div className='flex items-center gap-1 transition-transform hover:scale-110'>
                <p className='text-sm font-bold capitalize'>{t(sort)}</p>
                <IoIosArrowDown className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </div>
              {showSort && (
                <div className='bg-neutral glass-card border-grey absolute top-[120%] -right-2 z-50 flex flex-col items-center gap-1 rounded-md border-[3px] p-1 shadow-md'>
                  {SORT_OPTIONS.map((option) => (
                    <div
                      className='hover:bg-navItem relative w-full rounded-md p-3 pl-8 font-bold text-nowrap capitalize transition-colors'
                      key={option}
                      onClick={() => setSort(option)}
                    >
                      {sort === option && <Check className='absolute top-[17px] left-2' />}
                      <p>{t(option)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showTags && tagsEmpty && <p className='text-text/40 w-full text-center font-bold italic'>{t('no tags')}</p>}
      {showTags && (
        <div className='flex w-full flex-wrap gap-2'>
          {tagsLoading
            ? new Array(4).fill(1).map((_, i) => <LoadingCell key={i} className='h-7 w-20 rounded-full md:h-9' />)
            : displayedTags?.map((tag, i) => (
                <button
                  key={tag.tag + i}
                  className={`flex max-w-[33%] items-center gap-1.5 px-4 py-2 text-sm font-bold transition-transform hover:scale-110 ${
                    selectedTags?.includes(tag.tag)
                      ? 'text-darkGrey bg-zinc-100 shadow-inner shadow-black/10'
                      : 'bg-zinc-300/80 text-zinc-500'
                  } rounded-full`}
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
