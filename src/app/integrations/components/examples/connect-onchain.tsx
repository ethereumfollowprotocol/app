import React from 'react'
import Recommendations from '#/components/recommendations'

const ConnectOnchain = () => {
  return (
    <div className='bg-neutral shadow-medium flex w-full flex-col gap-0 overflow-hidden rounded-sm px-2 pt-6 pb-0 sm:gap-2 sm:px-4'>
      <h4 className='px-2 text-xl font-bold sm:text-2xl'>Help users connect onchain</h4>
      <p className='px-2 pt-3 text-sm sm:max-w-[90%] sm:pt-1 sm:text-base'>
        Embed the EFP Follow button to enable users to follow onchain new friends they discover in your app.
      </p>
      <div className='h-[380px] overflow-hidden'>
        <Recommendations
          endpoint='discover'
          limit={6}
          className='mt-0 p-0 shadow-none sm:px-3'
          showPageSelector={false}
        />
      </div>
    </div>
  )
}

export default ConnectOnchain
