'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import useSearch from './hooks/useSearch.ts'
import LoadingSpinner from '../loading-spinner.tsx'
import MagnifyingGlass from 'public/assets/icons/magnifying-glass.svg'
import { truncateAddress } from '#/lib/utilities.ts'

export function Search({
  disabled,
  size = 'w-full max-w-[400px]',
  isEditor
}: { disabled?: boolean; size?: string; isEditor?: boolean }) {
  const { t } = useTranslation()
  const { t: tEditor } = useTranslation('editor')

  const {
    router,
    searchBarRef,
    dropdownMenuOpen,
    dialogOpen,
    clickAwayRef,
    currentSearch,
    search,
    isLoading,
    searchResult,
    handleSearchEvent,
    resetSearch,
    addToCart,
    onSubmit,
    setDropdownMenuOpen,
    setDialogOpen
  } = useSearch(isEditor)

  return (
    <div className={`relative z-50 ${size}`} ref={clickAwayRef}>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className={`rounded-md  gap-2 ${isEditor ? 'flex' : 'hidden md:flex'}`}>
        <div className='w-full relative'>
          <input
            ref={searchBarRef}
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
            className='h-12 block w-full pr-12 truncate font-medium rounded-xl border-2 border-gray-200 pl-4 sm:text-sm bg-white/70'
          />
          <div
            className='pointer-events-none absolute inset-y-0 right-2 flex items-center'
            aria-hidden='true'
          >
            <Image
              src={MagnifyingGlass}
              alt='Search'
              className={`mr-2 h-5 w-5 text-grey`}
              aria-hidden='true'
            />
          </div>
        </div>
        {isEditor && (
          <button
            className='bg-gradient-to-b capitalize font-semibold py-3 px-6 from-kournikova-300 rounded-full to-salmon-400 text-black h-auto'
            onClick={() => addToCart(currentSearch)}
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
                  else router.push(`/${result.name}`)

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
                      else router.push(`/${result.name}`)
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
