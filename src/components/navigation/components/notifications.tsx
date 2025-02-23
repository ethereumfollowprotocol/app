import React from 'react'
import { useAccount } from 'wagmi'
import Bell from 'public/assets/icons/ui/bell.svg'

const Notifications = () => {
  const { address: userAddress } = useAccount()

  if (!userAddress) return null

  return <Bell className='h-auto w-9 cursor-pointer transition-transform hover:scale-110' />
}

export default Notifications
