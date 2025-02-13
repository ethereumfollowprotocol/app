import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { useState, type Dispatch, type SetStateAction } from 'react'

import useLanguage from './use-language'
import { LANGUAGES } from '#/lib/constants/languages'
import Check from 'public/assets/icons/ui/check.svg'

interface LanguageSelectorProps {
  setExternalLanguageMenuOpen?: Dispatch<SetStateAction<boolean>>
  setParentOpen?: Dispatch<SetStateAction<boolean>>
}

const LanguageSelector = ({ setExternalLanguageMenuOpen, setParentOpen }: LanguageSelectorProps) => {
  const [languageMenuSearch, setLanguageMenuSearch] = useState('')

  const { t } = useTranslation()
  const { changeLanguage, languageMenOpenu, selectedLanguage, setLanguageMenuOpen } = useLanguage()

  const closeLanguageMenu = () => {
    setLanguageMenuOpen(false)
    setLanguageMenuSearch('')
    setExternalLanguageMenuOpen?.(false)
  }

  const clickAwayLanguageRef = useClickAway<HTMLDivElement>((_) => closeLanguageMenu())

  const regularLanguages = LANGUAGES.filter((lang) => !lang.special).filter((lang) =>
    languageMenuSearch
      ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
        lang.englishLanguage.toLowerCase().includes(languageMenuSearch.toLowerCase())
      : true
  )
  const specialLanguages = LANGUAGES.filter((lang) => !!lang.special).filter((lang) =>
    languageMenuSearch
      ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
        lang.englishLanguage.toLowerCase().includes(languageMenuSearch.toLowerCase())
      : true
  )

  return (
    <div ref={clickAwayLanguageRef} className='group relative w-full cursor-pointer'>
      <div
        onClick={() => {
          setLanguageMenuOpen(!languageMenOpenu)
          setExternalLanguageMenuOpen?.(!languageMenOpenu)
        }}
        className='group-hover:bg-navItem flex w-full items-center justify-between rounded-md p-3'
      >
        <FiArrowLeft className='text-xl' />
        <div className='flex justify-end gap-2'>
          {selectedLanguage && <selectedLanguage.icon width={26} className='rounded-md' />}
          <p className='w-fit font-bold'>{selectedLanguage?.language}</p>
        </div>
      </div>
      <div
        className={`absolute -top-[56px] -right-[251px] z-50 lg:-top-[6px] lg:left-[95%] ${
          languageMenOpenu ? 'block' : 'top-0 hidden'
        } group-hover:block lg:pr-6`}
      >
        <div className='bg-neutral border-grey flex h-full max-h-[85vh] w-[246px] flex-col gap-2 gap-x-px overflow-scroll rounded-sm border-[3px] p-1 shadow-md lg:grid lg:max-h-[75vh] xl:w-[450px] xl:grid-cols-2'>
          <div
            onClick={closeLanguageMenu}
            className='hover:bg-navItem flex w-full cursor-pointer items-center justify-between rounded-md p-3 transition-opacity lg:hidden'
          >
            <FiArrowLeft className='text-xl font-bold' />
            <p className='font-bold'>Back</p>
          </div>
          <div className='flex flex-col items-center gap-3 p-3 xl:col-span-2'>
            <input
              type='text'
              placeholder='Search'
              value={languageMenuSearch}
              onChange={(e) => setLanguageMenuSearch(e.target.value)}
              className='border-grey bg-grey/30 focus:border-text/80 w-full rounded-md border-[3px] px-4 py-2 transition-colors'
            />
            {LANGUAGES.filter((lang) =>
              languageMenuSearch
                ? lang.language.toLowerCase().includes(languageMenuSearch.toLowerCase()) ||
                  lang.englishLanguage.toLowerCase().includes(languageMenuSearch.toLowerCase())
                : true
            ).length === 0 && (
              <div className='p-3'>
                <p className='font-bold'>{t('search no results')}</p>
              </div>
            )}
          </div>
          {regularLanguages.map((lang) => (
            <div
              className='hover:bg-navItem relative flex items-center rounded-md py-3 pl-8 font-bold transition-colors'
              key={lang.language}
              onClick={() => {
                changeLanguage(lang)
                closeLanguageMenu()
                setParentOpen?.(false)
              }}
            >
              {selectedLanguage && selectedLanguage.key === lang.key && (
                <Check width={16} className='absolute top-[35%] left-2' />
              )}
              <div className='flex gap-2 pr-3'>
                <lang.icon width={26} className='rounded-md' />
                <p>{lang.language}</p>
              </div>
            </div>
          ))}
          {specialLanguages.length > 0 && regularLanguages.length > 0 && (
            <div className='flex flex-col items-center gap-3 px-3 py-1 xl:col-span-2 xl:py-3'>
              <hr className='w-full rounded-full border-[1px] border-zinc-300 dark:border-zinc-500' />
            </div>
          )}
          {specialLanguages.map((lang) => (
            <div
              className='hover:bg-navItem relative flex items-center rounded-md py-3 pl-8 font-bold transition-colors'
              key={lang.language}
              onClick={() => {
                changeLanguage(lang)
                closeLanguageMenu()
                setParentOpen?.(false)
              }}
            >
              {selectedLanguage && selectedLanguage.key === lang.key && (
                <Check width={16} className='absolute top-[35%] left-2' />
              )}
              <div className='flex gap-2 pr-3'>
                <lang.icon width={26} className='rounded-md' />
                <p>{lang.language}</p>
              </div>
            </div>
          ))}
          <div className='h-4 w-full pb-6 lg:h-0 lg:pb-0' />
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
