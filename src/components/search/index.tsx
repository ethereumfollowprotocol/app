'use client'

import { isAddress } from 'viem'
import type { RefObject } from 'react'
import { useTranslation } from 'react-i18next'

import useSearch from './hooks/useSearch.ts'
import { cn, truncateAddress } from '#/lib/utilities.ts'
import GraySpinner from '../loaders/gray-spinner.tsx'
import PrimaryButton from '../buttons/primary-button.tsx'
import LoadingSpinner from '../loaders/loading-spinner.tsx'
import { listOpAddListRecord } from '#/utils/list-ops.ts'
import MagnifyingGlass from 'public/assets/icons/ui/magnifying-glass.svg'

export function Search({
  disabled,
  isNavbar = false,
  size = 'w-full max-w-[350px]',
}: {
  disabled?: boolean
  size?: string
  isNavbar?: boolean
}) {
  const isEditor = false
  const { t } = useTranslation()

  const {
    router,
    search,
    onSubmit,
    addToCart,
    isLoading,
    dialogOpen,
    resetSearch,
    clickAwayRef,
    searchBarRef,
    searchResult,
    setDialogOpen,
    currentSearch,
    isAddingToCart,
    dropdownMenuOpen,
    handleSearchEvent,
    setDropdownMenuOpen,
  } = useSearch(isEditor)

  return (
    <div className={`relative z-40`} ref={clickAwayRef}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className={cn(isEditor ? 'xs:flex-row flex flex-col' : 'hidden', 'gap-2 rounded-sm')}>
        <div className='group relative w-full'>
          {isEditor ? (
            <>
              <textarea
                ref={searchBarRef as RefObject<HTMLTextAreaElement>}
                id='search'
                name='search'
                rows={1}
                cols={50}
                spellCheck={false}
                autoComplete='off'
                disabled={disabled}
                value={currentSearch}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey === false) {
                    e.preventDefault()
                    onSubmit()
                  }
                  if (e.key === 'Escape') {
                    searchBarRef.current?.blur()
                    setDropdownMenuOpen(false)
                  }
                }}
                placeholder={t('search placeholder')}
                onChange={handleSearchEvent}
                onClick={(event) => {
                  event.preventDefault()
                  setDropdownMenuOpen(
                    event.currentTarget.value.length >= 3 && !!search && search.length >= 3 && !!searchResult
                  )
                }}
                className='focus:border-text/80 hover:border-text/80 border-grey bg-neutral/70 block max-h-20 min-h-12 w-full truncate rounded-sm border-[3px] py-3 pr-12 pl-4 font-medium text-wrap transition-colors outline-none sm:text-sm'
              />
            </>
          ) : (
            <input
              ref={searchBarRef as RefObject<HTMLInputElement>}
              type='text'
              id='search'
              name='search'
              spellCheck={false}
              autoComplete='off'
              disabled={disabled}
              value={currentSearch}
              placeholder={t('search placeholder')}
              onChange={handleSearchEvent}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSubmit()
                if (e.key === 'Escape') {
                  searchBarRef.current?.blur()
                  setDropdownMenuOpen(false)
                }
              }}
              onClick={(event) => {
                event.preventDefault()
                setDropdownMenuOpen(
                  event.currentTarget.value.length >= 3 && !!search && search.length >= 3 && !!searchResult
                )
              }}
              className='border-grey bg-neutral/70 focus:border-text/80 hover:border-text/80 block h-[54px] w-full truncate rounded-sm border-[3px] pr-12 pl-4 font-medium transition-colors sm:text-sm'
            />
          )}
          <div className='pointer-events-none absolute inset-y-0 right-4 flex items-center' aria-hidden='true'>
            {isEditor && isAddingToCart ? (
              <div className='mt-1'>
                <GraySpinner />
              </div>
            ) : (
              <MagnifyingGlass
                className='text-xl opacity-50 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100'
                aria-hidden='true'
              />
            )}
          </div>
        </div>
        {isEditor && (
          <PrimaryButton label={t('add')} className='xs:w-32 mx-auto h-12 w-full text-lg' onClick={() => onSubmit()} />
        )}
      </div>
      <div
        className={`bg-neutral shadow-medium absolute top-full left-0 mt-2 w-full rounded-sm border-[3px] p-3 md:p-4 ${
          dropdownMenuOpen ? (isEditor ? 'block' : 'hidden') : 'hidden'
        }`}
      >
        <div
          className={`w-full flex-col items-start text-lg ${isEditor ? 'flex' : 'hidden md:flex'}`}
          onFocusCapture={(event) => {
            event.preventDefault()
            event.stopPropagation()
            searchBarRef.current?.focus()
          }}
        >
          {isLoading && (
            <div className='h-40 w-full'>
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && searchResult.length === 0 ? (
            <div className='text-text/50 flex h-16 w-full items-center justify-center font-bold italic'>
              {t('search no results')}
            </div>
          ) : (
            searchResult.map((result, index) => (
              <div
                key={result.name}
                onClick={() => {
                  if (isEditor && result.resolvedAddress) addToCart([listOpAddListRecord(result.resolvedAddress.id)])
                  else
                    router.push(
                      `/${result.resolvedAddress?.id || (result.name[0] === '#' ? result.name.slice(1) : result.name)}${
                        isAddress(result.name) || result.name[0] === '#' ? '' : `?search=${result.name}`
                      }`
                    )

                  resetSearch()
                }}
                className='text-md flex max-w-full cursor-pointer items-center gap-1 truncate transition-all hover:scale-105 hover:opacity-75'
              >
                <p>{result.name}</p>
                {result.resolvedAddress?.id && (
                  <p className='text-text/50 text-sm'>- {truncateAddress(result.resolvedAddress?.id)}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className={cn(isEditor ? 'hidden' : 'block', 'relative z-50 w-fit')}>
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
                <div className='h-40 w-full'>
                  <LoadingSpinner />
                </div>
              )}
              {!isLoading && searchResult.length === 0 ? (
                <div className='flex h-16 w-full items-center justify-center pb-4 font-bold text-zinc-400 italic'>
                  {t('search no results')}
                </div>
              ) : (
                searchResult.map((result, index) => (
                  <div
                    key={result.name}
                    onClick={() => {
                      if (isEditor && result.resolvedAddress)
                        addToCart([listOpAddListRecord(result.resolvedAddress.id)])
                      else
                        router.push(
                          `/${
                            result.resolvedAddress?.id || (result.name[0] === '#' ? result.name.slice(1) : result.name)
                          }${isAddress(result.name) || result.name[0] === '#' ? '' : `?search=${result.name}`}`
                        )

                      resetSearch()
                    }}
                    className='text-md flex max-w-full cursor-pointer items-center gap-1 truncate transition-opacity hover:opacity-75'
                  >
                    <p>{result.name}</p>
                    {result.resolvedAddress?.id && (
                      <p className='text-sm text-zinc-400'>- {truncateAddress(result.resolvedAddress?.id)}</p>
                    )}
                  </div>
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
