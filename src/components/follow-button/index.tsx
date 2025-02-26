'use client'

import type { Address } from 'viem'
import { FollowButton as IdentityFollowButton } from '@encrypteddegen/identity-kit'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'

interface FollowButtonProps {
  address: Address
  className?: string
  isBlockedBy?: boolean
  disabled?: boolean
}

const FollowButton: React.FC<FollowButtonProps> = ({ address, className = '', isBlockedBy, ...props }) => {
  const { openConnectModal } = useConnectModal()
  const { address: connectedAddress } = useAccount()

  return (
    <IdentityFollowButton
      lookupAddress={address}
      connectedAddress={connectedAddress}
      onDisconnectedClick={openConnectModal}
      className={className}
      {...props}
    />
  )
}

export default FollowButton
