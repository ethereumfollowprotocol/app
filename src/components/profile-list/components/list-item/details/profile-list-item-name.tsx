'use client'
import Link from 'next/link'
import type { Address } from 'viem'
import { ens_beautify } from '@adraffy/ens-normalize'

import { isValidEnsName } from '#/utils/ens'
import { cn, truncateAddress } from '#/lib/utilities'
import LoadingCell from '#/components/loaders/loading-cell'

interface ProfileListItemNameProps {
  name?: string | null
  address: Address
  showTags?: boolean
  isCart?: boolean
  isLoading?: boolean
}

const ProfileListItemName: React.FC<ProfileListItemNameProps> = ({ name, address, showTags, isCart, isLoading }) => {
  if (isLoading) {
    return <LoadingCell className='h-6 w-28 rounded-sm 2xl:w-32' />
  }

  return (
    <Link href={`/${address}`} prefetch={true} className={cn(!isCart && 'w-fit max-w-full')}>
      <p
        className={`text-start font-bold hover:scale-110 2xl:text-lg ${
          showTags ? (isCart ? 'max-w-52 truncate' : 'w-full truncate') : 'w-fit max-w-full truncate'
        } transition-all hover:opacity-75`}
      >
        {name && isValidEnsName(name) ? ens_beautify(name) : truncateAddress(address)}
      </p>
    </Link>
  )
}

export default ProfileListItemName
