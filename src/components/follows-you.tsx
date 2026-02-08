import { cn } from '#/lib/utilities'
import { useFollowerState } from '@encrypteddegen/identity-kit'
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { Address } from 'viem'

interface FollowsYouProps {
  addressOrName: Address | string
  connectedAddress: Address
  list?: number
}

const FollowsYou: React.FC<FollowsYouProps> = ({ addressOrName, connectedAddress, list }) => {
  const { t } = useTranslation()
  const { followerTag } = useFollowerState({ lookupAddressOrName: addressOrName, connectedAddress, list })

  return (
    <div
      className={cn(
        'bg-tertiary text-text! w-fit rounded-sm px-2 py-[3px] text-xs font-semibold',
        followerTag.className
      )}
    >
      {t(followerTag.text)}
    </div>
  )
}

export default FollowsYou
