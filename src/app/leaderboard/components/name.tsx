import Link from 'next/link'
import { useAccount } from 'wagmi'
import { ens_beautify } from '@adraffy/ens-normalize'

import { Avatar } from '#/components/avatar'
import { isValidEnsName } from '#/utils/ens'
import { truncateAddress } from '#/lib/utilities'
import FollowsYou from '#/components/follows-you'
import { useEFPProfile } from '#/contexts/efp-profile-context'

interface NameProps {
  address: string
  name?: string | null
  avatar?: string | null
}

const Name: React.FC<NameProps> = ({ address, name, avatar }) => {
  const { selectedList } = useEFPProfile()
  const { address: connectedAddress } = useAccount()

  return (
    <div className='flex w-full items-center gap-2' data-name='name-column'>
      <Link href={`/${address}`} className='w-fit'>
        <Avatar
          name={name || address}
          avatarUrl={avatar}
          size='h-[45px] w-[45px] 2xl:h-[50px] 2xl:w-[50px] hover:opacity-80 transition-all hover:scale-110 transition-all'
        />
      </Link>
      <div className='flex flex-col items-start justify-center text-left' style={{ maxWidth: 'calc(100% - 55px)' }}>
        <Link href={`/${address}`} prefetch={true} className='w-full'>
          <p className='xxs:text-lg max-w-full truncate text-base font-bold transition-all hover:scale-110 hover:opacity-60'>
            {name && isValidEnsName(name) ? ens_beautify(name) : truncateAddress(address)}
          </p>
        </Link>
        {connectedAddress && (
          <FollowsYou addressOrName={address} connectedAddress={connectedAddress} list={selectedList} />
        )}
      </div>
    </div>
  )
}

export default Name
