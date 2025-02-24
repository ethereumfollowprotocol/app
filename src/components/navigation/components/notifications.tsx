import React from 'react'
import { useAccount } from 'wagmi'
import { useTranslation } from 'react-i18next'
import Bell from 'public/assets/icons/ui/bell.svg'

const Notifications = () => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  if (!userAddress) return null

  return (
    <div className='group/notifications relative z-10'>
      <Bell className='h-auto w-9 cursor-pointer transition-transform hover:scale-110' />
      <div className='absolute -top-1 left-[66px] hidden w-fit opacity-0 transition-all transition-discrete group-hover/notifications:hidden group-hover/notifications:opacity-100 sm:group-hover/notifications:block starting:opacity-0'>
        <p className='bg-neutral shadow-small text-text rounded-sm px-4 py-2 text-lg font-semibold text-nowrap capitalize'>
          {t('notifications')}
        </p>
      </div>
    </div>
  )
}

export default Notifications
