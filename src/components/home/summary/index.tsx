'use client'

import { UserProfileCard } from '#/components/user-profile-card'
import { useAccount } from 'wagmi'

const Summary = () => {
  const { address: userAddress } = useAccount()

  if (!userAddress) return null

  return (
    <div className='mt-36 flex items-start gap-6'>
      <UserProfileCard address={userAddress} stats={{ followers_count: 12, following_count: 8 }} />
      <UserProfileCard address={userAddress} stats={{ followers_count: 12, following_count: 8 }} />
      <UserProfileCard address={userAddress} stats={{ followers_count: 12, following_count: 8 }} />
    </div>
  )
}

export default Summary
