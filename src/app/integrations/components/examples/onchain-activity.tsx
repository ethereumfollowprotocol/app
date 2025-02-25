import React from 'react'
import Image from 'next/image'
import OnchainActivityImageLight from 'public/assets/art/example-activity-light.png'
import OnchainActivityImageDark from 'public/assets/art/example-activity-dark.png'

const OnchainActivity = () => {
  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-3 rounded-sm px-2 pt-5 pb-0 sm:px-4 sm:pt-6'>
      <h4 className='px-2 text-xl font-bold sm:text-2xl'>Open social graph for an activity feed</h4>
      <p className='px-2 text-sm sm:max-w-[90%] sm:text-base'>
        Start showing your users the activity of their friends right away by pulling who they follow onchain.
      </p>
      <Image src={OnchainActivityImageLight} alt='Onchain Activity' className='block w-full rounded-sm dark:hidden' />
      <Image src={OnchainActivityImageDark} alt='Onchain Activity' className='hidden w-full rounded-sm dark:block' />
    </div>
  )
}

export default OnchainActivity
