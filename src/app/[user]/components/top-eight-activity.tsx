import Image from 'next/image'
import { isAddress } from 'viem'
import { useTranslation } from 'react-i18next'
import { useIsClient } from '@uidotdev/usehooks'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

import { cn, truncateAddress } from '#/lib/utilities'
import TopEight from '#/components/top-eight'
import FeedCard from '#/components/feed-card'
import { fetchAccount } from '#/api/fetch-account'
import Edit from 'public/assets/icons/ui/edit.svg'
import Share from 'public/assets/icons/ui/ios-share.svg'
import InterfaceLight from 'public/assets/icons/socials/interface.png'
import InterfaceDark from 'public/assets/icons/socials/interface-dark.png'
import ShareModal from '#/components/top-eight/components/share-modal'
import type { UserProfilePageTableProps } from '#/components/profile-page-table'

interface TopEightActivityProps {
  user: string
  isConnectedUserProfile: boolean
  followingListProps: UserProfilePageTableProps
}

const TopEightActivity: React.FC<TopEightActivityProps> = ({ user, isConnectedUserProfile, followingListProps }) => {
  const [activeTab, setActiveTab] = useState<'top 8' | 'activity'>('top 8')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [isTopEightEmpty, setIsTopEightEmpty] = useState(false)

  const { t } = useTranslation()
  const isClient = useIsClient()

  const { data: account } = useQuery({
    queryKey: ['account', user],
    queryFn: async () => await fetchAccount(user),
  })

  const accountAddress = isAddress(user) ? user : account?.address || null

  const generateTop8Image = async (): Promise<Blob> => {
    const response = await fetch(`/api/top-eight?user=${user}`, {
      method: 'GET',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', response.status, errorText)
      throw new Error(`Failed to generate image: ${response.status} ${errorText}`)
    }

    return await response.blob()
  }

  const generateTop8ImageUrl = (): string => {
    const params = new URLSearchParams()
    params.append('user', user)

    return `${window.location.origin}/api/top-eight?${params}`
  }

  const onShareTopEight = () => {
    setShareModalOpen(true)
  }

  const headerRight = {
    'top 8': (
      <div className='mr-1 flex items-center gap-3'>
        {!isTopEightEmpty && (
          <button onClick={onShareTopEight} className='transition-all hover:scale-110' title='Share Top 8'>
            <Share className='h-6 w-6' />
          </button>
        )}
        <button
          onClick={() => setEditModalOpen(true)}
          className={cn('transition-all hover:scale-110', isConnectedUserProfile ? 'block' : 'hidden')}
        >
          <Edit className='h-5 w-5' />
        </button>
      </div>
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
  }, [activeTab, isClient])

  useEffect(() => {
    if (isTopEightEmpty) {
      setActiveTab('activity')
    }
  }, [isTopEightEmpty])

  const content = {
    'top 8': (
      <TopEight
        user={user}
        isConnectedUserProfile={isConnectedUserProfile}
        followingListProps={followingListProps}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        setIsTopEightEmpty={setIsTopEightEmpty}
      />
    ),
    activity: (
      <div className='shadow-medium max-h-[50vh] overflow-y-scroll lg:max-h-fit'>
        {accountAddress ? (
          <FeedCard activityAddress={accountAddress} cardSize='lg:w-[360px] xl:w-[602px]' />
        ) : (
          <p className='bg-neutral rounded-sm py-8 text-center text-xl font-semibold italic lg:w-[360px] xl:w-[602px]'>
            {t('no activity')}
          </p>
        )}
      </div>
    ),
  }[activeTab]

  return (
    <>
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

      {/* Share Modal */}
      {!isTopEightEmpty && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          userName={account?.ens?.name || (isAddress(user) ? truncateAddress(user) : user) || 'Unknown'}
          userAddress={user}
          generateImage={generateTop8Image}
          generateImageUrl={generateTop8ImageUrl}
        />
      )}
    </>
  )
}

export default TopEightActivity
