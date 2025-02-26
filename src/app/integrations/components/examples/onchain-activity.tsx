import React from 'react'
import Image from 'next/image'
import OnchainActivityImageDark from 'public/assets/art/example-activity-dark.png'
import OnchainActivityImageLight from 'public/assets/art/example-activity-light.png'
import Link from 'next/link'
import ExternalLink from 'public/assets/icons/ui/external-link.svg'

const OnchainActivity = () => {
  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-3 rounded-sm px-2 pt-5 pb-0 sm:px-4 sm:pt-6'>
      <h4 className='px-2 text-xl font-bold sm:text-2xl'>Open social graph for an activity feed</h4>
      <p className='px-2 text-sm sm:max-w-[90%] sm:text-base'>
        Start showing your users the activity of their friends right away by pulling who they follow onchain.
      </p>
      <div className='ml-4 flex flex-col gap-1.5 italic sm:ml-10'>
        <Link
          href='https://ethidentitykit.com/docs/api/Users/following'
          target='_blank'
          className='flex items-center gap-2 transition-opacity hover:opacity-60'
        >
          <p>API: User&apos;s followings</p>
          <ExternalLink className='h-4 w-auto' />
        </Link>
      </div>
      <div className='shadow-medium mt-2 h-[500px] w-full overflow-hidden'>
        <Image
          src={OnchainActivityImageDark}
          width={600}
          height={900}
          alt='Onchain Activity'
          className='hidden w-full rounded-sm dark:block'
        />
        <Image
          src={OnchainActivityImageLight}
          width={600}
          height={900}
          alt='Onchain Activity'
          className='w-full rounded-sm dark:hidden'
        />
      </div>
    </div>
  )
}

export default OnchainActivity
