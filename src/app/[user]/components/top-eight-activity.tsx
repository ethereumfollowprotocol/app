import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '#/lib/utilities'
import TopEight from '#/components/top-eight'
import type { UserProfilePageTableProps } from '#/components/profile-page-table'
import Edit from 'public/assets/icons/ui/edit.svg'
import Image from 'next/image'
import InterfaceLight from 'public/assets/icons/socials/interface.png'
import InterfaceDark from 'public/assets/icons/socials/interface-dark.png'
import FeedCard from '#/components/feed-card'
import { useIsClient } from '@uidotdev/usehooks'
import { useQuery } from '@tanstack/react-query'
import { isAddress } from 'viem'
import { fetchAccount } from '#/api/fetch-account'

interface TopEightActivityProps {
  user: string
  isConnectedUserProfile: boolean
  followingListProps: UserProfilePageTableProps
}

const TopEightActivity: React.FC<TopEightActivityProps> = ({ user, isConnectedUserProfile, followingListProps }) => {
  const [activeTab, setActiveTab] = useState<'top 8' | 'activity'>('top 8')
  const [editModalOpen, setEditModalOpen] = useState(false)

  const { t } = useTranslation()
  const isClient = useIsClient()
  const headerRight = {
    'top 8': (
      <button onClick={() => setEditModalOpen(true)} className='mr-2 transition-all hover:scale-110'>
        <Edit className='h-5 w-5' />
      </button>
    ),
    activity: (
      <>
        <Image
          src={InterfaceLight}
          alt='Interface'
          width={120}
          height={30}
          className='mr-1 hidden h-auto sm:block lg:hidden xl:block dark:hidden'
        />
        <Image
          src={InterfaceDark}
          alt='Interface'
          width={120}
          height={30}
          className='mr-1 hidden h-auto dark:sm:block dark:lg:hidden dark:xl:block'
        />
      </>
    ),
  }[activeTab]

  useEffect(() => {
    if (!isClient) return

    const userPage = document.getElementById('user-page')
    if (userPage && userPage.scrollTop > 300) userPage.scrollTo({ top: 300, behavior: 'smooth' })
  }, [activeTab])

  const { data: account } = useQuery({
    queryKey: ['activity-account', user],
    queryFn: async () => {
      if (isAddress(user)) return user
      const account = await fetchAccount(user)
      return account?.address || null
    },
  })

  const content = {
    'top 8': (
      <TopEight
        user={user}
        isConnectedUserProfile={isConnectedUserProfile}
        followingListProps={followingListProps}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
      />
    ),
    activity: (
      <div className='shadow-medium max-h-[50vh] overflow-y-scroll lg:max-h-fit'>
        {account ? (
          <FeedCard activityAddress={account} cardSize='lg:w-[360px] xl:w-[602px]' />
        ) : (
          <p className='bg-neutral rounded-sm py-8 text-center text-xl font-semibold italic lg:w-[360px] xl:w-[602px]'>
            {t('no activity')}
          </p>
        )}
      </div>
    ),
  }[activeTab]

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-neutral shadow-medium -top-0.5 z-20 flex w-full items-center justify-between gap-4 rounded-sm p-2 lg:sticky'>
        <div className='bg-grey relative flex w-full items-center rounded-sm sm:w-64 lg:w-full xl:w-64'>
          <div
            className={cn(
              'bg-text/10 absolute h-full w-1/2 rounded-sm transition-all duration-200',
              activeTab === 'top 8' ? 'left-0' : 'left-1/2'
            )}
          />
          <p
            className={cn(
              'text-text z-10 w-1/2 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110',
              activeTab === 'top 8' ? 'text-text' : 'text-text/60'
            )}
            onClick={() => setActiveTab?.('top 8')}
          >
            {t('top8')}
          </p>
          <p
            className={cn(
              'text-text z-10 w-1/2 cursor-pointer py-2 text-center text-lg font-bold transition-transform hover:scale-110',
              activeTab === 'activity' ? 'text-text' : 'text-text/60'
            )}
            onClick={() => setActiveTab?.('activity')}
          >
            {t('activity')}
          </p>
        </div>
        {headerRight}
      </div>
      {content}
    </div>
  )
}

export default TopEightActivity
