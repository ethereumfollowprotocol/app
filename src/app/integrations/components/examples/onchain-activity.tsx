import React from 'react'
import Image from 'next/image'
import OnchainActivityImageDark from 'public/assets/art/example-activity-dark.png'
import OnchainActivityImageLight from 'public/assets/art/example-activity-light.png'

const OnchainActivity = () => {
  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-3 rounded-sm px-2 pt-5 pb-0 sm:px-4 sm:pt-6'>
      <h4 className='px-2 text-xl font-bold sm:text-2xl'>Open social graph for an activity feed</h4>
      <p className='px-2 text-sm sm:max-w-[90%] sm:text-base'>
        Start showing your users the activity of their friends right away by pulling who they follow onchain.
      </p>
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
