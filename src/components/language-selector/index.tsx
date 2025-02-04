import Image from 'next/image'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { useState, type Dispatch, type SetStateAction } from 'react'

import useLanguage from './use-language'
import { LANGUAGES } from '#/lib/constants/languages'
import GreenCheck from 'public/assets/icons/check-green.svg'

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
    <div ref={clickAwayLanguageRef} className='w-full cursor-pointer group relative'>
      <div
        onClick={() => {
          setLanguageMenuOpen(!languageMenOpenu)
          setExternalLanguageMenuOpen?.(!languageMenOpenu)
        }}
        className='flex justify-between p-3 rounded-md group-hover:bg-navItem items-center w-full'
      >
        <FiArrowLeft className='text-xl' />
        <div className='flex justify-end gap-2'>
          <Image src={selectedLanguage?.icon || ''} alt='Language icon' width={26} className='rounded-md' />
          <p className='font-bold w-fit'>{selectedLanguage?.language}</p>
        </div>
      </div>
      <div
        className={`-right-[251px] -top-[56px] lg:-top-[6px] absolute lg:right-[95%] z-50 ${
          languageMenOpenu ? 'block' : 'hidden top-0'
        } group-hover:block lg:pr-6`}
      >
        <div className='flex overflow-scroll flex-col lg:grid lg:max-h-[75vh] max-h-[85vh] h-full xl:grid-cols-2 gap-2 gap-x-px w-[246px] xl:w-[450px] bg-neutral border-[3px] border-grey p-1 rounded-lg shadow-md'>
          <div
            onClick={closeLanguageMenu}
            className='flex lg:hidden justify-between items-center w-full hover:bg-navItem p-3 rounded-md transition-opacity cursor-pointer'
          >
            <FiArrowLeft className='text-xl font-bold' />
            <p className=' font-bold'>Back</p>
          </div>
          <div className='xl:col-span-2 p-3 flex flex-col gap-3 items-center'>
            <input
              type='text'
              placeholder='Search'
              value={languageMenuSearch}
              onChange={(e) => setLanguageMenuSearch(e.target.value)}
              className='w-full px-4 py-2 border-[3px] border-grey transition-colors rounded-md bg-grey/30 focus:border-text/80'
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
              className='py-3 pl-8 relative flex items-center font-bold rounded-md hover:bg-navItem transition-colors'
              key={lang.language}
              onClick={() => {
                changeLanguage(lang)
                closeLanguageMenu()
                setParentOpen?.(false)
              }}
            >
              {selectedLanguage && selectedLanguage.key === lang.key && (
                <Image src={GreenCheck} alt='List selected' width={16} className='absolute left-2 top-[35%]' />
              )}
              <div className='flex gap-2 pr-3'>
                <Image src={lang.icon} alt='Language icon' width={26} className='rounded-md' />
                <p>{lang.language}</p>
              </div>
            </div>
          ))}
          {specialLanguages.length > 0 && regularLanguages.length > 0 && (
            <div className='xl:col-span-2 px-3 py-1 xl:py-3 flex flex-col gap-3 items-center'>
              <hr className='border-[1px] rounded-full border-zinc-300 dark:border-zinc-500 w-full' />
            </div>
          )}
          {specialLanguages.map((lang) => (
            <div
              className='py-3 pl-8 relative flex items-center font-bold rounded-md hover:bg-navItem transition-colors'
              key={lang.language}
              onClick={() => {
                changeLanguage(lang)
                closeLanguageMenu()
                setParentOpen?.(false)
              }}
            >
              {selectedLanguage && selectedLanguage.key === lang.key && (
                <Image src={GreenCheck} alt='List selected' width={16} className='absolute left-2 top-[35%]' />
              )}
              <div className='flex gap-2 pr-3'>
                <Image src={lang.icon} alt='Language icon' width={26} className='rounded-md' />
                <p>{lang.language}</p>
              </div>
            </div>
          ))}
          <div className='h-4 lg:h-0 pb-6 lg:pb-0 w-full' />
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
