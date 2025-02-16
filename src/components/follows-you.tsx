import { cn } from '#/lib/utilities'
import { useFollowerState } from 'ethereum-identity-kit'
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
  const { followerTag } = useFollowerState({ addressOrName: addressOrName, connectedAddress, list })

  return (
    <div className={cn('rounded-sm bg-zinc-100 px-2 py-0.5 text-xs font-medium', followerTag.className)}>
      {t(followerTag.text)}
    </div>
  )
}

export default FollowsYou
