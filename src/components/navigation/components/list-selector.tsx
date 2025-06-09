import { useAccount } from 'wagmi'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useClickAway } from '@uidotdev/usehooks'

import { cn } from '#/lib/utilities'
import Check from 'public/assets/icons/ui/check.svg'
import ArrowLeft from 'public/assets/icons/ui/arrow-left.svg'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import { formatNumber } from '#/utils/format/format-number'
import { useIsEditView } from '#/hooks/use-is-edit-view'

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

  const router = useRouter()
  const { t } = useTranslation()
  const isProfile = useIsEditView()
  const { address: userAddress } = useAccount()
  const { selectedList, lists, setSelectedList } = useEFPProfile()

  if (!lists?.lists || lists.lists.length === 0) return null

  const onListClick = (list: string) => {
    localStorage.setItem('selected-list', list)
    setSelectedList(list === 'new list' ? undefined : Number(list))
    setMenuOpen(false)
    setWalletMenuOpen(false)

    if (isProfile && list) {
      // switch to the address page if primary list or new list is selected
      router.push(`/${list === lists.primary_list || list === 'new list' ? userAddress : list}?ssr=false`)
    }
  }

  return (
    <div ref={clickAwayListRef} className='group relative w-full cursor-pointer'>
      <div
        onClick={() => setMenuOpen(!open)}
        className='group-hover:bg-nav-item flex w-full cursor-pointer items-center justify-between p-4 transition-opacity sm:flex-row-reverse'
      >
        <ArrowLeft className='h-4 w-4 sm:rotate-180' />
        <p className='font-bold'>{selectedList ? `${t('list')} #${formatNumber(selectedList)}` : t('mint new list')}</p>
      </div>
      <div
        className={cn(
          'absolute top-0 -right-full z-50 block h-full w-56 transition-transform group-hover:block sm:left-full sm:w-fit sm:pl-2',
          lists?.lists && lists?.lists?.length > 0 ? (open ? 'sm:block' : 'sm:hidden') : 'hidden group-hover:hidden'
        )}
      >
        <div className='bg-neutral shadow-medium flex w-full min-w-56 flex-col gap-2 overflow-auto rounded-sm sm:max-h-[80vh]'>
          <div
            onClick={() => setMenuOpen(false)}
            className='hover:bg-nav-item flex w-full cursor-pointer items-center justify-between p-4 transition-opacity sm:hidden'
          >
            <ArrowLeft className='h-6 w-6' />
            <p className='font-bold'>Back</p>
          </div>
          {lists?.lists?.map((list) => (
            <div
              className='hover:bg-nav-item relative flex w-full items-center gap-1 rounded-sm p-4 pl-8'
              key={list}
              onClick={() => onListClick(list)}
            >
              {selectedList === Number(list) && <Check className='absolute top-5 left-2.5 h-4 w-4 text-green-500' />}
              <div className='flex flex-wrap items-end gap-1 sm:flex-nowrap'>
                <p className='font-bold text-wrap'>{`${t('list')} #${formatNumber(Number(list))}`}</p>
                {lists.primary_list === list && (
                  <p className='mb-0.5 text-sm font-medium text-nowrap text-zinc-400 italic'>- {t('primary')}</p>
                )}
              </div>
            </div>
          ))}
          <div
            key={'new list'}
            className='hover:bg-nav-item relative flex gap-2 rounded-sm p-4 pl-8'
            onClick={() => onListClick('new list')}
          >
            {selectedList === undefined && <Check className='absolute top-5 left-2.5 h-4 w-4 text-green-500' />}
            <p className='font-bold'>{t('mint new list')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListSelector
