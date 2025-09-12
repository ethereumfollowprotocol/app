'use client'

import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useRouter } from 'next/navigation'
import { useClickAway } from '@uidotdev/usehooks'

import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useEFPProfile } from '#/contexts/efp-profile-context'
import Cross from 'public/assets/icons/ui/cross.svg'
import { FollowersAndFollowing } from 'ethereum-identity-kit'

interface BlockedMutedProps {
  user: string
  list?: string | number
  isManager?: boolean
  onClose: () => void
}

const BlockedMuted: React.FC<BlockedMutedProps> = ({ user, onClose }) => {
  const blockedMutedRef = useClickAway<HTMLDivElement>(() => {
    onClose()
  })

  const router = useRouter()
  const isMyProfile = useIsEditView()
  const { selectedList } = useEFPProfile()
  const { address: userAddress } = useAccount()

  return (
    <div className='fixed top-0 left-0 z-[1000] flex h-full w-full justify-center overflow-scroll bg-black/50'>
      <div
        ref={blockedMutedRef}
        className='relative mt-[85px] mb-24 flex h-fit w-full max-w-5xl gap-6 rounded-sm px-4 md:mt-24 md:px-6 lg:mt-28 2xl:gap-8'
      >
        <div
          onClick={onClose}
          className='bg-neutral absolute -top-10 right-4 z-50 cursor-pointer rounded-sm p-1 transition-all hover:scale-110 hover:opacity-90 md:right-6'
        >
          <Cross className='h-auto w-7' />
        </div>
        <FollowersAndFollowing
          user={user}
          defaultTab='following'
          selectedList={selectedList?.toString()}
          onProfileClick={(addressOrName: Address | string) => {
            router.push(`/${addressOrName}?ssr=false`)
          }}
          isConnectedUserProfile={isMyProfile}
          connectedAddress={userAddress}
          showBlocked={true}
          showOnlyBlocked={true}
          showHeaderImage={true}
          showProfileTooltip={true}
          showTagsByDefault={true}
        />
      </div>
    </div>
  )
}

export default BlockedMuted
