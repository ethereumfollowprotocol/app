import React from 'react'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'
import Image from 'next/image'
import CompleteProfileImageLight from 'public/assets/art/example-profile-light.png'
import CompleteProfileImageDark from 'public/assets/art/example-profile-dark.png'
import Link from 'next/link'

const CompleteProfile = () => {
  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-2 rounded-sm pt-6 pr-1'>
      <h4 className='px-4 text-xl font-bold sm:px-6 sm:text-2xl'>Complete a user&apos;s ENS profile</h4>
      <div className='flex w-full flex-col gap-2 px-4 text-sm sm:w-[90%] sm:px-6 sm:text-base'>
        <p>
          Use ENS for the user&apos;s name, avatar, header, bio, and more. EFP completes the profile and shows how a
          user relates to the rest of the crypto community.
        </p>
        <div className='ml-4 flex flex-col gap-1.5 italic sm:ml-10'>
          <Link
            href='https://ethidentitykit.com/docs/components/profile-card'
            target='_blank'
            className='flex items-center gap-2 transition-opacity hover:opacity-60'
          >
            <p>Profile Cards on Ethereum Identity Kit</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
          <Link
            href='https://ethidentitykit.com/docs/api/Users/stats'
            target='_blank'
            className='flex items-center gap-2 transition-opacity hover:opacity-60'
          >
            <p>API: EFP follower and following counts</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
          <Link
            href='https://ethidentitykit.com/docs/api/Users/ens'
            target='_blank'
            className='flex items-center gap-2 transition-opacity hover:opacity-60'
          >
            <p>API: ENS data</p>
            <ExternalLink className='h-4 w-auto' />
          </Link>
        </div>
      </div>
      <Image src={CompleteProfileImageLight} alt='Complete Profile' className='block w-full rounded-sm dark:hidden' />
      <Image src={CompleteProfileImageDark} alt='Complete Profile' className='hidden w-full rounded-sm dark:block' />
    </div>
  )
}

export default CompleteProfile
