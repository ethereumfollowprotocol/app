import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { useState, type Dispatch, type SetStateAction } from 'react'

import useLanguage from './use-language'
import { LANGUAGES } from '#/lib/constants/languages'
import Check from 'public/assets/icons/ui/check.svg'
import ArrowLeft from 'public/assets/icons/ui/arrow-left.svg'
import ArrowRight from 'public/assets/icons/ui/arrow-right.svg'

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
        className='group-hover:bg-nav-item flex w-full items-center justify-between rounded-sm p-4'
      >
        <div className='flex items-center gap-2'>
          {selectedLanguage && <selectedLanguage.icon className='h-7 w-8 scale-90 rounded-sm' />}
          <p className='w-fit font-bold'>{selectedLanguage?.language}</p>
        </div>
        <ArrowRight className='text-xl' />
      </div>
      <div
        className={`absolute -top-[56px] -right-[251px] z-50 sm:top-0 sm:left-full sm:pl-2 ${
          languageMenOpenu ? 'block' : 'top-0 hidden'
        } group-hover:block`}
      >
        <div className='bg-neutral flex h-full max-h-[85vh] w-[246px] flex-col gap-2 gap-x-px overflow-scroll rounded-sm shadow-md lg:grid lg:max-h-[75vh] xl:w-[450px] xl:grid-cols-2'>
          <div
            onClick={closeLanguageMenu}
            className='hover:bg-nav-item flex w-full cursor-pointer items-center justify-between rounded-sm p-4 transition-opacity lg:hidden'
          >
            <ArrowLeft className='text-xl font-bold' />
            <p className='font-bold'>Back</p>
          </div>
          <div className='flex flex-col items-center gap-3 p-3 xl:col-span-2'>
            <input
              type='text'
              placeholder='Search'
              value={languageMenuSearch}
              onChange={(e) => setLanguageMenuSearch(e.target.value)}
              className='bg-text-neutral/30 w-full rounded-sm px-4 py-2 transition-colors'
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
              className='hover:bg-nav-item relative flex items-center rounded-sm py-4 pl-8 font-bold transition-colors'
              key={lang.language}
              onClick={() => {
                changeLanguage(lang)
                closeLanguageMenu()
                setParentOpen?.(false)
              }}
            >
              {selectedLanguage && selectedLanguage.key === lang.key && (
                <Check width={16} className='absolute top-5 left-2 h-5 w-5 text-green-500' />
              )}
              <div className='flex items-center gap-2 pr-3'>
                <lang.icon className='h-7 w-8 scale-90 rounded-sm' />
                <p>{lang.language}</p>
              </div>
            </div>
          ))}
          {specialLanguages.length > 0 && regularLanguages.length > 0 && (
            <div className='flex flex-col items-center gap-3 px-3 py-1 xl:col-span-2 xl:py-4'>
              <hr className='border-neutral w-full rounded-full border-[1px]' />
            </div>
          )}
          {specialLanguages.map((lang) => (
            <div
              className='hover:bg-nav-item relative flex items-center rounded-sm py-4 pl-8 font-bold transition-colors'
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
              <div className='flex items-center gap-2 pr-3'>
                <lang.icon className='h-7 w-8 scale-90 rounded-sm' />
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
