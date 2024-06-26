'use client'

import Image from 'next/image'
import type { LegacyRef } from 'react'
import { useTranslation } from 'react-i18next'

import useSearch from './hooks/useSearch.ts'
import GraySpinner from '../gray-spinner.tsx'
import LoadingSpinner from '../loading-spinner.tsx'
import { truncateAddress } from '#/lib/utilities.ts'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass.svg'

export function Search({
  disabled,
  size = 'w-full max-w-[400px]',
  isEditor
}: { disabled?: boolean; size?: string; isEditor?: boolean }) {
  const { t } = useTranslation()
  const { t: tEditor } = useTranslation('editor')

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
    addToCartError,
    isAddingToCart,
    dropdownMenuOpen,
    handleSearchEvent,
    setAddToCartError,
    setDropdownMenuOpen
  } = useSearch(isEditor)

  return (
    <div className={`relative z-50 ${size}`} ref={clickAwayRef}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className={`rounded-md  gap-2 ${isEditor ? 'flex' : 'hidden md:flex'}`}>
        <div className='w-full relative'>
          {isEditor ? (
            <>
              <p className='text-red-500 text-left text-sm truncate w-full absolute -top-5 left-0'>
                {addToCartError}
              </p>
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
                onFocus={() => setAddToCartError(undefined)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && e.shiftKey === false) {
                    e.preventDefault()
                    onSubmit()
                  }
                }}
                placeholder={t('navigation.search placeholder')}
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
                className={`h-fit block text-wrap w-full py-3 pr-12 truncate outline-none font-medium rounded-xl border-2 ${
                  addToCartError ? 'border-red-500' : 'border-gray-200'
                } pl-4 sm:text-sm bg-white/70`}
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
              placeholder={t('navigation.search placeholder')}
              onChange={handleSearchEvent}
              onKeyDown={e => {
                if (e.key === 'Enter') onSubmit()
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
              className='h-12 block pr-12 w-full truncate font-medium rounded-xl border-2 border-gray-200 pl-4 sm:text-sm bg-white/70'
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
              <Image
                src={MagnifyingGlass}
                alt='Search'
                className={`h-5 w-5 text-grey`}
                aria-hidden='true'
              />
            )}
          </div>
        </div>
        {isEditor && (
          <button
            className='bg-gradient-to-b capitalize font-semibold py-3 px-6 from-kournikova-300 rounded-full to-salmon-400 text-black h-auto'
            onClick={() => onSubmit()}
          >
            {tEditor('add')}
          </button>
        )}
      </div>
      <div
        className={`absolute glass-card p-3 md:p-4 w-full shadow-md border-2 border-gray-200 bg-white/95 rounded-xl top-full mt-2 left-0 ${
          dropdownMenuOpen ? (isEditor ? 'block' : 'hidden md:block') : 'hidden'
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
            <div className='w-full h-16 flex items-center justify-center italic font-semibold text-gray-400'>
              {t('navigation.search no results')}
            </div>
          ) : (
            searchResult.map((result, index) => (
              <p
                key={result.name}
                onClick={() => {
                  if (isEditor && result.resolvedAddress) addToCart(result.resolvedAddress.id)
                  else router.push(`/${result.resolvedAddress?.id || result.name}`)

                  resetSearch()
                }}
                className='max-w-full truncate text-md flex items-center hover:opacity-75 gap-1 cursor-pointer transition-opacity'
              >
                <p>{result.name}</p>
                <p className='text-sm text-gray-400'>
                  - {truncateAddress(result.resolvedAddress?.id)}
                </p>
              </p>
            ))
          )}
        </div>
      </div>
      <div className={` relative z-50 ${isEditor ? 'hidden' : 'md:hidden block'}`}>
        <Image
          src={MagnifyingGlass}
          onClick={() => setDialogOpen(true)}
          alt='Search'
          className='h-5 w-5'
          aria-hidden='true'
        />
        <div
          ref={clickAwayRef}
          className={`p-0 md:hidden w-[40vw] min-w-68 absolute -top-3 left-0 mx-auto ${
            dialogOpen ? 'block' : 'hidden'
          }`}
        >
          <div>
            <input
              name='search'
              className='h-11 rounded-xl border-2 w-full shadow-md border-gray-200 px-2'
              spellCheck={false}
              placeholder={t('navigation.search placeholder')}
              disabled={disabled}
              onSubmit={onSubmit}
              value={currentSearch}
              onKeyDown={e => {
                if (e.key === 'Enter') onSubmit()
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
            className={`absolute glass-card w-full shadow-md border-2 p-3 rounded-xl bg-white/95 border-gray-200 top-full mt-2 left-0 ${
              dropdownMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <div
              className='w-full mx-auto min-w-full text-lg py-0 md:hidden block '
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
                <div className='w-full h-16 flex items-center justify-center italic font-semibold text-gray-400'>
                  {t('navigation.search no results')}
                </div>
              ) : (
                searchResult.map(result => (
                  <div
                    key={result.name}
                    onClick={() => {
                      if (isEditor && result.resolvedAddress) addToCart(result.resolvedAddress.id)
                      else router.push(`/${result.resolvedAddress?.id || result.name}`)
                      resetSearch()
                    }}
                    className='max-w-full truncate text-md hover:opacity-75 cursor-pointer transition-opacity'
                  >
                    {result.name}
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
