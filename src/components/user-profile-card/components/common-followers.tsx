import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import LoadingCell from '#/components/loaders/loading-cell'
import { fetchCommonFollowers, noCommonFollowers } from '#/api/followers/fetch-common-followers'

interface CommonFollowersProps {
  address: Address
}

const CommonFollowers: React.FC<CommonFollowersProps> = ({ address }) => {
  const { t } = useTranslation()
  const { address: userAddress } = useAccount()

  const { data, isLoading } = useQuery({
    queryKey: ['common-followers', address, userAddress],
    queryFn: async () => {
      if (!userAddress) return noCommonFollowers

      const response = await fetchCommonFollowers(userAddress, address)
      return response
    },
  })

  if (!userAddress || (data?.results?.length || 0) === 0) return null

  const displayedAvatars = data?.results.slice(0, 3)
  const displayedNames = data?.results.slice(0, 2)
  const resultLength = data?.length || 0

  if (isLoading || data?.results.length === 0) return null

  const commonFollowersText = (count: number) => {
    if (count === 1) return t('common followers one')
    if (count === 2) return t('common followers two')
    if (count === 3) return t('common followers three')
    return t('common followers plural')
  }

  return (
    <div className='mx-auto flex w-full max-w-108 items-center justify-center gap-2 p-4 pt-0'>
      <div className='flex'>
        {isLoading ? (
          <>
            <LoadingCell className='z-0 h-9 w-9 rounded-full' />
            <LoadingCell className='z-10 -ml-[18px] h-9 w-9 rounded-full' />
            <LoadingCell className='z-20 -ml-[18px] h-9 w-9 rounded-full' />
          </>
        ) : (
          displayedAvatars?.map((result, index) => (
            <Avatar
              key={result.address}
              size={`w-9 h-9 rounded-full ${index === 0 ? 'z-0' : `-ml-[18px] z-${index * 10}`}`}
              avatarUrl={result.avatar}
              name={result.name || result.address}
            />
          ))
        )}
      </div>
      {isLoading ? (
        <LoadingCell className='h-10 rounded-xl' style={{ width: 'calc(100% - 80px)' }} />
      ) : (
        <p
          className='text-text/40 overflow-hidden text-left text-sm font-medium'
          style={{ maxWidth: 'calc(100% - 84px)' }}
        >
          {displayedNames
            ?.map(
              (profile, index) =>
                `${profile.name || truncateAddress(profile.address)}${resultLength > 2 && index === 1 ? ',' : ''}`
            )
            .join(', ')}{' '}
          {`${resultLength > 2 ? `${t('and')} ${resultLength - 2}` : ''} ${commonFollowersText(resultLength)}`}
        </p>
      )}
    </div>
  )
}

export default CommonFollowers
