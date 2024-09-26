'use client'

import { isAddress } from 'viem'
import type { LegacyRef } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

import useSearch from './hooks/useSearch.ts'
import { truncateAddress } from '#/lib/utilities.ts'
import GraySpinner from '../loaders/gray-spinner.tsx'
import LoadingSpinner from '../loaders/loading-spinner.tsx'
import { PrimaryButton } from '../buttons/primary-button.tsx'

export function Search({
  disabled,
  size = 'w-full max-w-[350px]',
  isEditor
}: { disabled?: boolean; size?: string; isEditor?: boolean }) {
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
    setDropdownMenuOpen
  } = useSearch(isEditor)

  return (
    <div className={`relative z-50 ${size}`} ref={clickAwayRef}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div
        className={`rounded-md gap-2 ${isEditor ? 'flex flex-col xs:flex-row' : 'hidden 2xl:flex'}`}
      >
        <div className='w-full relative group'>
          {isEditor ? (
            <>
              <textarea
                ref={searchBarRef as LegacyRef<HTMLTextAreaElement>}
                id='search'
                name='search'
                rows={1}
                cols={50}
                spellCheck={false}
                autoComplete='off'
                disabled={disabled}
                value={currentSearch}
                onKeyDown={e => {
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
                onClick={event => {
                  event.preventDefault()
                  setDropdownMenuOpen(
                    event.currentTarget.value.length >= 3 &&
                      !!search &&
                      search.length >= 3 &&
                      !!searchResult
                  )
                }}
                className='max-h-20 min-h-12 block text-wrap w-full py-3 pr-12 truncate outline-none font-medium rounded-xl border-[3px] hover:border-[#888] focus:border-[#888] dark:focus:border-white/80 dark:border-white/50 dark:hover:border-white/80  transition-colors border-zinc-200 pl-4 sm:text-sm bg-white/70 dark:bg-darkGrey/70'
              />
            </>
          ) : (
            <input
              ref={searchBarRef as LegacyRef<HTMLInputElement>}
              type='text'
              id='search'
              name='search'
              spellCheck={false}
              autoComplete='off'
              disabled={disabled}
              value={currentSearch}
              placeholder={t('search placeholder')}
              onChange={handleSearchEvent}
              onKeyDown={e => {
                if (e.key === 'Enter') onSubmit()
                if (e.key === 'Escape') {
                  searchBarRef.current?.blur()
                  setDropdownMenuOpen(false)
                }
              }}
              onClick={event => {
                event.preventDefault()
                setDropdownMenuOpen(
                  event.currentTarget.value.length >= 3 &&
                    !!search &&
                    search.length >= 3 &&
                    !!searchResult
                )
              }}
              className='h-12 block pr-12 w-full truncate font-medium rounded-xl border-[3px] dark:border-white/50 border-zinc-200 pl-4 sm:text-sm bg-white/70 dark:bg-darkGrey/70 focus:border-[#666] hover:border-[#666] dark:focus:border-white/80 dark:hover:border-white/80 transition-colors'
            />
          )}
          <div
            className='pointer-events-none absolute inset-y-0 right-4 flex items-center'
            aria-hidden='true'
          >
            {isEditor && isAddingToCart ? (
              <div className='mt-1'>
                <GraySpinner />
              </div>
            ) : (
              <FiSearch
                className='text-xl opacity-50 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100'
                aria-hidden='true'
              />
            )}
          </div>
        </div>
        {isEditor && (
          <PrimaryButton
            label={t('add')}
            className='mx-auto w-full xs:w-32 h-12 text-lg'
            onClick={() => onSubmit()}
          />
        )}
      </div>
      <div
        className={`absolute glass-card p-3 md:p-4 w-full shadow-md border-[3px] border-zinc-200 dark:border-zinc-500 bg-white dark:bg-darkGrey rounded-xl top-full mt-2 left-0 ${
          dropdownMenuOpen ? (isEditor ? 'block' : 'hidden 2xl:block') : 'hidden'
        }`}
      >
        <div
          className={`w-full items-start text-lg flex-col ${isEditor ? 'flex' : 'hidden md:flex'}`}
          onFocusCapture={event => {
            event.preventDefault()
            event.stopPropagation()
            searchBarRef.current?.focus()
          }}
        >
          {isLoading && (
            <div className='w-full h-40'>
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && searchResult.length === 0 ? (
            <div className='w-full h-16 flex items-center justify-center italic font-bold text-zinc-400'>
              {t('search no results')}
            </div>
          ) : (
            searchResult.map((result, index) => (
              <div
                key={result.name}
                onClick={() => {
                  if (isEditor && result.resolvedAddress) addToCart(result.resolvedAddress.id)
                  else
                    router.push(
                      `/${
                        result.resolvedAddress?.id ||
                        (result.name[0] === '#' ? result.name.slice(1) : result.name)
                      }${
                        isAddress(result.name) || result.name[0] === '#'
                          ? ''
                          : `?search=${result.name}`
                      }`
                    )

                  resetSearch()
                }}
                className='max-w-full hover:scale-105 truncate text-md flex items-center hover:opacity-75 gap-1 cursor-pointer transition-all'
              >
                <p>{result.name}</p>
                {result.resolvedAddress?.id && (
                  <p className='text-sm text-zinc-400'>
                    - {truncateAddress(result.resolvedAddress?.id)}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className={` relative z-50 ${isEditor ? 'hidden' : '2xl:hidden block'}`}>
        <FiSearch
          onClick={() => setDialogOpen(true)}
          className='text-3xl hover:scale-125 cursor-pointer transition-all hover:opacity-65'
          aria-hidden='true'
        />
        <div
          ref={clickAwayRef}
          className={`p-0 2xl:hidden w-[40vw] min-w-68 max-w-86 absolute -top-3 left-0 mx-auto ${
            dialogOpen ? 'block' : 'hidden'
          }`}
        >
          <div>
            <input
              name='search'
              ref={searchBarRef as LegacyRef<HTMLInputElement>}
              className='h-12 block pr-12 w-full  truncate font-medium rounded-xl border-[3px] pl-4 sm:text-sm bg-white dark:bg-darkGrey focus:border- border-[#666] dark:border-white/80 transition-colors'
              spellCheck={false}
              placeholder={t('search placeholder')}
              disabled={disabled}
              onSubmit={onSubmit}
              value={currentSearch}
              onKeyDown={e => {
                if (e.key === 'Enter') onSubmit()
                if (e.key === 'Escape') setDialogOpen(false)
              }}
              onChange={handleSearchEvent}
              onClick={event => {
                event.preventDefault()
                setDropdownMenuOpen(
                  event.currentTarget.value.length >= 3 &&
                    !!search &&
                    search.length >= 3 &&
                    !!searchResult
                )
              }}
              autoComplete='off'
            />
          </div>
          <div
            className={`absolute glass-card w-full shadow-md border-[3px] p-3 rounded-xl border-zinc-200 dark:border-zinc-500 bg-white dark:bg-darkGrey top-full mt-2 left-0 ${
              dropdownMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div
              className='w-full mx-auto min-w-full text-lg py-0 2xl:hidden block '
              ref={clickAwayRef}
              onFocusCapture={event => {
                event.preventDefault()
                event.stopPropagation()
                searchBarRef.current?.focus()
              }}
            >
              {isLoading && (
                <div className='w-full h-40'>
                  <LoadingSpinner />
                </div>
              )}
              {!isLoading && searchResult.length === 0 ? (
                <div className='w-full h-16 flex items-center pb-4 justify-center italic font-bold text-zinc-400'>
                  {t('search no results')}
                </div>
              ) : (
                searchResult.map((result, index) => (
                  <div
                    key={result.name}
                    onClick={() => {
                      if (isEditor && result.resolvedAddress) addToCart(result.resolvedAddress.id)
                      else
                        router.push(
                          `/${
                            result.resolvedAddress?.id ||
                            (result.name[0] === '#' ? result.name.slice(1) : result.name)
                          }${
                            isAddress(result.name) || result.name[0] === '#'
                              ? ''
                              : `?search=${result.name}`
                          }`
                        )

                      resetSearch()
                    }}
                    className='max-w-full truncate text-md flex items-center hover:opacity-75 gap-1 cursor-pointer transition-opacity'
                  >
                    <p>{result.name}</p>
                    {result.resolvedAddress?.id && (
                      <p className='text-sm text-zinc-400'>
                        - {truncateAddress(result.resolvedAddress?.id)}
                      </p>
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
