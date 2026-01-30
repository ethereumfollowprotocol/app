'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ProfileTooltip, type Address, type ProfileListType } from 'ethereum-identity-kit'

interface ProfileTooltipWrapperProps {
  addressOrName: string
  connectedAddress: Address
  selectedList: ProfileListType
  horizontalPlacement?: 'left' | 'right'
  horizontalOffset?: number
  children: React.ReactElement
}

const ProfileTooltipWrapper: React.FC<ProfileTooltipWrapperProps> = ({
  addressOrName,
  connectedAddress,
  selectedList,
  horizontalPlacement,
  horizontalOffset = 12,
  children,
}) => {
  const router = useRouter()

  return (
    <ProfileTooltip
      addressOrName={addressOrName}
      connectedAddress={connectedAddress}
      selectedList={selectedList}
      showFollowerState={false}
      showFollowButton={false}
      showBio={true}
      showSocials={true}
      showStatus={true}
      showDelay={1000}
      horizontalOffset={horizontalOffset}
      horizontalPlacement={horizontalPlacement}
      onStatClick={({ addressOrName, stat }) => {
        router.push(`/${addressOrName}?tab=${stat}&ssr=false`)
      }}
      onProfileClick={(addressOrName: Address | string) => {
        router.push(`/${addressOrName}?ssr=false`)
      }}
    >
      {children as React.ReactElement}
    </ProfileTooltip>
  )
}

export default ProfileTooltipWrapper
