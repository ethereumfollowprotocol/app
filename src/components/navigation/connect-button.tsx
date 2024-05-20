'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import type { Address, GetEnsAvatarReturnType } from 'viem'
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'

import { truncateAddress } from '#/lib/utilities'
import { resolveENSProfile } from '#/utils/resolveAddress'
import ArrowDown from 'public/assets/icons/arrow-down.svg'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'

const nullEnsProfile = {
  name: null,
  avatar: null
}

const ConnectButton = () => {
  const [ensProfile, setENSProfile] = useState<{
    name: string | null
    avatar: GetEnsAvatarReturnType | null
  }>(nullEnsProfile)

  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { address: userAddress } = useAccount()

  const getENSProfile = async (address: Address) => {
    const data = await resolveENSProfile(address)
    setENSProfile(data)
  }

  useEffect(() => {
    if (!userAddress) {
      setENSProfile(nullEnsProfile)
      return
    }

    getENSProfile(userAddress)
  }, [userAddress, getENSProfile])

  return (
    <button
      type='button'
      // className='bg-gradient-to-br p-[2px] from-yellow to-pink cursor-pointer h-12 rounded-full w-40'
      className='border-[#FFC057] hover:bg-[#FFC057]/10 px-1 transition-colors border-2 gap-[6px] cursor-pointer flex justify-between items-center h-12 glass-card rounded-full w-48'
      onClick={() =>
        userAddress && openAccountModal
          ? openAccountModal()
          : openConnectModal
            ? openConnectModal()
            : null
      }
    >
      {userAddress ? (
        <>
          <Image
            src={ensProfile.avatar || DefaultAvatar}
            alt='ENS Avatar'
            width={36}
            height={36}
            className='rounded-full'
          />
          <p className='font-semibold truncate text-sm'>
            {ensProfile.name || truncateAddress(userAddress)}
          </p>
          <Image src={ArrowDown} alt='Open button' className='w-4 mr-1' />
        </>
      ) : (
        <div className='w-full h-full flex items-center justify-center   rounded-full'>
          <p className='font-semibold text-black'>Connect Wallet</p>
        </div>
      )}
    </button>
  )
}

export default ConnectButton
