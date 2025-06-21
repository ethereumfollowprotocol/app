import React, { useState } from 'react'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { cn } from '#/lib/utilities'
import { useGlassTheme } from '#/hooks/use-glass-theme'

interface SearchProps {
  currentSearch: string
  handleSearchEvent: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<SearchProps> = ({ currentSearch, handleSearchEvent }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const { getGlassClass } = useGlassTheme()

  const clickAwayRef = useClickAway<HTMLDivElement>(() => setSearchOpen(false))
  const { t } = useTranslation()

  return (
    <div ref={clickAwayRef} className='relative z-50'>
      <MagnifyingGlass onClick={() => setSearchOpen(!searchOpen)} className='h-7 w-7 cursor-pointer md:hidden' />
      <div
        className={cn(
          'shadow-small absolute -top-1.5 left-9 w-[240px] md:relative md:top-0 md:left-0 md:shadow-none',
          searchOpen ? 'flex' : 'hidden md:flex'
        )}
      >
        <div className='group w-full overflow-hidden rounded-sm transition-colors sm:text-sm'>
          <div
            className='pointer-events-none absolute inset-y-0 -top-0.5 right-0 hidden items-center pl-3 md:flex'
            aria-hidden='true'
          >
            <MagnifyingGlass
              className='mr-3 h-auto w-6 opacity-30 transition-opacity group-focus-within:opacity-80 group-hover:opacity-80 dark:opacity-60 dark:group-focus-within:opacity-100 dark:group-hover:opacity-100'
              aria-hidden='true'
            />
          </div>
          <input
            type='text'
            spellCheck={false}
            placeholder={t('search placeholder')}
            value={currentSearch}
            onChange={handleSearchEvent}
            className={cn(
              getGlassClass('liquid-glass-button', 'bg-nav-item'),
              'block h-10 w-full border-0 pr-10 pl-4 font-medium sm:text-sm md:h-12'
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Search
