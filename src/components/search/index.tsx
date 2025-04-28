'use client'

import type { RefObject } from 'react'
import { useTranslation } from 'react-i18next'

import useSearch from './hooks/useSearch.ts'
import GraySpinner from '../loaders/gray-spinner.tsx'
import { cn } from '#/lib/utilities.ts'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'
import ResultItem from './result-item.tsx'

export function Search({ disabled }: { disabled?: boolean }) {
  const { t } = useTranslation()

  const {
    search,
    onSubmit,
    isLoading,
    dialogOpen,
    resetSearch,
    clickAwayRef,
    searchBarRef,
    searchResult,
    setDialogOpen,
    currentSearch,
    dropdownMenuOpen,
    handleSearchEvent,
    setDropdownMenuOpen,
  } = useSearch()

  return (
    <div className={`relative z-40`} ref={clickAwayRef}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative z-50 w-fit'>
        <div className='group/search-button relative'>
          <MagnifyingGlass
            onClick={() => setDialogOpen(!dialogOpen)}
            className={cn(
              'h-auto w-9 cursor-pointer transition-all hover:scale-110 hover:opacity-65',
              dialogOpen && 'text-primary-selected'
            )}
          />
          <div className='absolute -top-1 left-[66px] hidden w-fit opacity-0 transition-all transition-discrete group-hover/search-button:hidden group-hover/search-button:opacity-100 sm:group-hover/search-button:block starting:opacity-0'>
            <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
              {t('search')}
            </p>
          </div>
        </div>
        <div
          ref={clickAwayRef}
          className={cn(
            'absolute -top-2 left-10 w-[40vw] max-w-86 min-w-68 shadow-md transition-all sm:left-16',
            dialogOpen ? 'block opacity-100 starting:opacity-0' : 'hidden opacity-0'
          )}
        >
          <input
            name='search'
            ref={searchBarRef as RefObject<HTMLInputElement>}
            className='bg-neutral block h-12 w-full rounded-sm px-4 font-medium shadow-md sm:h-[54px] sm:text-sm'
            spellCheck={false}
            placeholder={t('search placeholder')}
            disabled={disabled}
            onSubmit={onSubmit}
            value={currentSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSubmit()
              if (e.key === 'Escape') setDialogOpen(false)
            }}
            onChange={handleSearchEvent}
            onClick={(event) => {
              event.preventDefault()
              setDropdownMenuOpen(
                event.currentTarget.value.length >= 3 && !!search && search.length >= 3 && !!searchResult
              )
            }}
            autoComplete='off'
          />
          <div className={`bg-neutral mt-2 w-full rounded-sm p-3 shadow-md ${dropdownMenuOpen ? 'block' : 'hidden'}`}>
            <div
              className='mx-auto block w-full min-w-full py-0 text-lg'
              ref={clickAwayRef}
              onFocusCapture={(event) => {
                event.preventDefault()
                event.stopPropagation()
                searchBarRef.current?.focus()
              }}
            >
              {isLoading && (
                <div className='flex h-40 w-full items-center justify-center'>
                  <GraySpinner size={40} />
                </div>
              )}
              {!isLoading && searchResult.length === 0 ? (
                <div className='flex h-16 w-full items-center justify-center font-bold text-zinc-400 italic'>
                  {t('search no results')}
                </div>
              ) : (
                searchResult.map((result, index) => (
                  <ResultItem key={index} result={result} resetSearch={resetSearch} />
                ))
              )}
            </div>
          </div>
          <label className='sr-only'>Search</label>
        </div>
      </div>
    </div>
  )
}
