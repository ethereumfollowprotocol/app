import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { cn } from '#/lib/utilities'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import Check from 'public/assets/icons/ui/check.svg'

interface ListSelectorProps {
  setWalletMenuOpen: (open: boolean) => void
  setSubMenuOpen: (open: boolean) => void
}

const ListSelector: React.FC<ListSelectorProps> = ({ setWalletMenuOpen, setSubMenuOpen }) => {
  const [open, setOpen] = useState(false)
  const clickAwayListRef = useClickAway<HTMLDivElement>(() => setOpen(false))

  const setMenuOpen = (state: boolean) => {
    setOpen(state)
    setSubMenuOpen(state)
  }

  const { t } = useTranslation()
  const { selectedList, lists, setSelectedList } = useEFPProfile()

  if (!lists?.lists || lists.lists.length === 0) return null

  return (
    <div ref={clickAwayListRef} className='group relative w-full cursor-pointer'>
      <div
        onClick={() => setMenuOpen(!open)}
        className='group-hover:bg-navItem flex w-full cursor-pointer items-center justify-between rounded-md p-4 transition-opacity sm:flex-row-reverse'
      >
        <p className='font-bold'>{selectedList ? `${t('list')} #${selectedList}` : t('mint new list')}</p>
        <FiArrowRight className='text-xl' />
      </div>
      <div
        className={cn(
          'absolute top-0 -right-full z-50 block h-full w-[224px] transition-transform group-hover:block sm:left-full sm:w-fit sm:pl-2',
          lists?.lists && lists?.lists?.length > 0 ? (open ? 'sm:block' : 'sm:hidden') : 'hidden group-hover:hidden'
        )}
      >
        <div className='bg-neutral border-grey flex w-full min-w-[224px] flex-col gap-2 overflow-auto rounded-sm shadow-lg sm:max-h-[80vh]'>
          <div
            onClick={() => setMenuOpen(false)}
            className='flex w-full cursor-pointer items-center justify-between rounded-md p-4 transition-opacity hover:bg-slate-100 sm:hidden dark:hover:bg-zinc-400/20'
          >
            <FiArrowLeft className='text-xl' />
            <p className='font-bold'>Back</p>
          </div>
          {lists?.lists?.map((list) => (
            <div
              className='hover:bg-navItem relative flex w-full items-center gap-1 rounded-md p-4 pl-8'
              key={list}
              onClick={() => {
                localStorage.setItem('selected-list', list)
                setSelectedList(Number(list))
                setMenuOpen(false)
                setWalletMenuOpen(false)
              }}
            >
              {selectedList === Number(list) && <Check className='absolute top-[17px] left-2' />}
              <div className='flex flex-wrap items-end gap-1 sm:flex-nowrap'>
                <p className='font-bold text-wrap'>{`${t('list')} #${list}`}</p>
                {lists.primary_list === list && (
                  <p className='mb-0.5 text-sm font-medium text-nowrap text-zinc-400 italic'>- {t('primary')}</p>
                )}
              </div>
            </div>
          ))}
          <div
            key={'new list'}
            className='hover:bg-navItem relative flex gap-2 rounded-md p-4 pl-8'
            onClick={() => {
              localStorage.setItem('selected-list', 'new list')
              setSelectedList(undefined)
              setMenuOpen(false)
              setWalletMenuOpen(false)
            }}
          >
            {selectedList === undefined && <Check className='absolute top-[17px] left-2' />}
            <p className='font-bold'>{t('mint new list')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListSelector
