import React from 'react'
import type { Address } from 'viem'
import { RefreshIcon } from 'ethereum-identity-kit'
import useFollowingState from '#/hooks/use-following-state'
import ThreeDotMenu from '#/components/user-profile-card/components/three-dot-menu'

interface MoreOptionsProps {
  address: Address
  profileList?: number | null
  primaryList?: number | null
  profileName?: string | null
  isConnectedUserCard: boolean
  openBlockModal?: () => void
  openQrCodeModal?: () => void
  openListSettingsModal?: () => void
  refetchData?: () => void
}

const MoreOptions: React.FC<MoreOptionsProps> = ({
  address,
  profileList,
  primaryList,
  profileName,
  openBlockModal,
  openQrCodeModal,
  isConnectedUserCard,
  openListSettingsModal,
  refetchData,
}) => {
  const { followingState } = useFollowingState({
    address,
  })

  return (
    <div className='absolute top-6 right-8 flex gap-2'>
      <p className='bg-neutral rounded-sm px-2 py-[3px] text-sm font-semibold sm:text-sm'>#{profileList}</p>
      <button
        onClick={refetchData}
        className='bg-neutral rounded-sm p-1 transition-all hover:scale-110 hover:opacity-60'
      >
        <RefreshIcon height={16} width={16} />
      </button>
      <ThreeDotMenu
        address={address}
        profileList={profileList}
        primaryList={primaryList}
        profileName={profileName}
        isConnectedUserCard={isConnectedUserCard}
        showMoreOptions={true}
        followState={followingState}
        openBlockModal={openBlockModal}
        openQrCodeModal={openQrCodeModal}
        openListSettingsModal={openListSettingsModal}
      />
    </div>
  )
}

export default MoreOptions
