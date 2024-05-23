import Image from 'next/image'

import ArrowUp from 'public/assets/icons/arrow-up.svg'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import SearchIcon from 'public/assets/icons/magnifying-glass.svg'
import { useMemo, useState } from 'react'
import { DEFAULT_TAGS, SORT_OPTIONS } from '#/lib/constants'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import type { ProfileTabType } from '#/types/common'
import { useClickAway } from '@uidotdev/usehooks'
import { Searchbar } from '#/components/searchbar'

interface TableHeaderProps {
  title: ProfileTabType
  search: string
  showTags: boolean
  setShowTags: (input: boolean) => void
  setSearch: (input: string) => void
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  showTags,
  setShowTags,
  search,
  setSearch
}) => {
  const [showSort, setShowSort] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const clickAwaySortRef = useClickAway<HTMLDivElement>(() => {
    setShowSort(false)
  })
  const clickAwaySearchRef = useClickAway<HTMLDivElement>(() => {
    setShowSearch(false)
  })

  const {
    setFollowersSort,
    setFollowingSort,
    followersSort,
    followingSort,
    toggleTag,
    followersTags,
    followingTags
  } = useEFPProfile()

  const tags = useMemo(
    () =>
      ({
        following: followingTags,
        followers: followersTags
      })[title],
    [followersTags, followingTags, title]
  )
  const sort = {
    following: followingSort,
    followers: followersSort
  }[title]
  const setSort = {
    following: setFollowingSort,
    followers: setFollowersSort
  }[title]

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex justify-between w-full'>
        <div className='flex gap-4 justify-between items-center w-full'>
          <div ref={clickAwaySearchRef} className='flex gap-3 items-center'>
            <p className='uppercase text-lg lg:text-xl font-bold'>{title}</p>
            <div className='relative z-50'>
              <div
                className='cursor-pointer max-w-40 flex items-center gap-2 hover:opacity-75'
                onClick={() => setShowSearch(!showSearch)}
              >
                <Image src={SearchIcon} alt='Search' width={18} height={18} />
                <p className='font-medium text-sm truncate hidden sm:block md:hidden lg:block xl:hidden 2xl:block'>
                  {search}
                </p>
              </div>
              {showSearch && (
                <div className='absolute glass-card flex items-center border-2 bg-white/75 border-gray-200 -top-[65%] gap-1 lg:-left-1 -left-16 sm:-left-1 md:-left-16 w-64 h-10 rounded-lg shadow-md'>
                  <div
                    className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'
                    aria-hidden='true'
                  >
                    <Image
                      src={SearchIcon}
                      alt='Search'
                      className='mr-3 h-4 w-4 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>
                  <input
                    type='text'
                    spellCheck={false}
                    autoFocus={true}
                    autoComplete='off'
                    placeholder={'Search ENS Name or Address'}
                    onChange={e => {
                      setSearch(e.target.value)
                    }}
                    value={search}
                    className='lowercase font-medium h-8 block w-full rounded-lg border-0 border-transparent pl-9 sm:text-sm bg-white/50'
                  />
                </div>
              )}
            </div>
          </div>
          <div className='flex gap-4'>
            <div
              onClick={() => setShowTags(!showTags)}
              className='cursor-pointer flex items-center gap-1'
            >
              {/* <Searchbar queryKey={searchQueryKey} placeholder='Search...' /> */}
              <p className='text-sm font-bold'>Tags</p>
              <Image
                src={ArrowDown}
                alt='open tags'
                width={10}
                height={10}
                className={`transition-transform ${showTags ? 'rotate-180' : ''}`}
              />
            </div>
            <div
              ref={clickAwaySortRef}
              onClick={() => setShowSort(!showSort)}
              className='cursor-pointer flex relative items-center gap-1'
            >
              {/* <Searchbar queryKey={searchQueryKey} placeholder='Search...' /> */}
              <p className='text-sm capitalize font-bold'>{sort}</p>
              <Image
                src={ArrowDown}
                alt='open sort'
                width={10}
                height={10}
                className={`transition-transform ${showSort ? 'rotate-180' : ''}`}
              />
              {showSort && (
                <div className=' bg-white/80 w-40 glass-card px-3 py-2 gap-1 z-50 shadow-md border-2 rounded-md border-gray-200 absolute top-[120%] flex flex-col items-center right-0'>
                  {SORT_OPTIONS.map(option => (
                    <div
                      className='font-bold capitalize transition-colors text-center text-gray-500 hover:text-darkGrey'
                      key={option}
                      onClick={() => setSort(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showTags && (
        <div className='flex flex-wrap w-full gap-2'>
          {DEFAULT_TAGS.map(tag => (
            <button
              key={tag.toLowerCase()}
              className={`text-sm px-4 py-2 font-semibold italic ${
                tags.includes(tag)
                  ? 'text-darkGrey bg-white shadow-inner shadow-black/40'
                  : 'text-gray-500 bg-gray-300/80'
              } rounded-full capitalize`}
              name={tag.toLowerCase()}
              onClick={() => toggleTag(title, tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TableHeader
