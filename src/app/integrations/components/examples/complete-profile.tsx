'use client'

import React from 'react'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { ProfileCard } from 'ethereum-identity-kit'

import FollowButton from '#/components/follow-button'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'
import ThreeDotMenu from '#/components/user-profile-card/components/three-dot-menu'

const CompleteProfile = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-2 rounded-sm pt-6 pr-1'>
      <h4 className='px-4 text-xl font-bold sm:px-6 sm:text-2xl'>{t('example profile title')}</h4>
      <div className='flex w-full flex-col gap-2 px-4 text-sm sm:w-[90%] sm:px-6 sm:text-base'>
        <p>{t('example profile description')}</p>
        <div className='ml-4 flex flex-col gap-1.5 italic sm:ml-10'>
          <Link
            href='https://ethidentitykit.com/docs/components/profile-card'
            target='_blank'
            className='flex w-fit items-center gap-2 transition-opacity hover:underline hover:opacity-60'
          >
            <p>{t('example profile card link')}</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
          <Link
            href='https://ethidentitykit.com/docs/api/Users/stats'
            target='_blank'
            className='flex w-fit items-center gap-2 transition-opacity hover:underline hover:opacity-60'
          >
            <p>{t('example profile count link')}</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
          <Link
            href='https://ethidentitykit.com/docs/api/Users/ens'
            target='_blank'
            className='flex w-fit items-center gap-2 transition-opacity hover:underline hover:opacity-60'
          >
            <p>{t('example profile ens link')}</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
        </div>
      </div>
      <div className='relative mx-auto mt-3 h-auto w-full overflow-hidden pb-2 pl-1 sm:h-[500px] sm:pb-0 sm:pl-0 2xl:w-[580px]'>
        <div className='z-10 mx-auto w-full px-2 sm:absolute sm:top-20 sm:left-4 sm:w-[400px]'>
          <ProfileCard
            addressOrName='0xd63c2582b071f41090e89d975f738e87e7b8da50'
            connectedAddress={userAddress}
            style={{ width: '100%', paddingBottom: '12px' }}
            onProfileClick={() => {
              router.push('/0xd63c2582b071f41090e89d975f738e87e7b8da50?ssr=false')
            }}
            extraOptions={{
              customFollowButton: <FollowButton address='0xd63c2582b071f41090e89d975f738e87e7b8da50' />,
              openListSettings: () => {
                router.push('/0xd63c2582b071f41090e89d975f738e87e7b8da50?ssr=false&modal=list_settings')
              },
              nameMenu: (
                <ThreeDotMenu
                  address='0xd63c2582b071f41090e89d975f738e87e7b8da50'
                  isConnectedUserCard={false}
                  showMoreOptions={true}
                  followState={'none'}
                />
              ),
            }}
            className='shadow-medium'
          />
        </div>
        <div className='relative top-0 left-32 z-0 hidden w-[400px] sm:absolute sm:block 2xl:left-40'>
          <ProfileCard
            addressOrName='0x05977b2fb9b7ab3f3733b34350044a01a388579c'
            connectedAddress={userAddress}
            style={{ width: '100%', paddingBottom: '12px' }}
            onProfileClick={() => {
              router.push('/0x05977b2fb9b7ab3f3733b34350044a01a388579c?ssr=false')
            }}
            extraOptions={{
              customFollowButton: <FollowButton address='0x05977b2fb9b7ab3f3733b34350044a01a388579c' />,
              openListSettings: () => {
                router.push('/0x05977b2fb9b7ab3f3733b34350044a01a388579c?ssr=false&modal=list_settings')
              },
              nameMenu: (
                <ThreeDotMenu
                  address='0x05977b2fb9b7ab3f3733b34350044a01a388579c'
                  isConnectedUserCard={false}
                  showMoreOptions={true}
                  followState={'none'}
                />
              ),
            }}
            className='shadow-medium'
          />
        </div>
      </div>
    </div>
  )
}

export default CompleteProfile
