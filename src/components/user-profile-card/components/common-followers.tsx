import { useAccount } from 'wagmi'
import type { Address } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import { fetchCommonFollowers, noCommonFollowers } from '#/api/fetchCommonFollowers'
import LoadingCell from '#/components/loading-cell'

interface CommonFollowersProps {
  address: Address
}

const CommonFollowers: React.FC<CommonFollowersProps> = ({ address }) => {
  const { address: userAddress } = useAccount()

  const { data, isLoading } = useQuery({
    queryKey: ['common-followers', address],
    queryFn: async () => {
      if (!userAddress) return noCommonFollowers

      const response = await fetchCommonFollowers(userAddress, address)
      return response
    }
  })

  if (!userAddress || data?.results.length === 0) return null

  const displayedAvatars = data?.results.slice(0, 3)
  const displayedNames = data?.results.slice(0, 2)
  const resultLength = data?.length || 0

  return (
    <div className='w-full flex items-center justify-center gap-2 p-4 pt-0'>
      <div className='flex'>
        {isLoading ? (
          <>
            <LoadingCell className='w-9 h-9 rounded-full z-0 ' />
            <LoadingCell className='w-9 h-9 rounded-full z-10 -ml-[18px]' />
            <LoadingCell className='w-9 h-9 rounded-full z-20 -ml-[18px]' />
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
          className='text-left font-medium text-[#888] text-sm overflow-hidden'
          style={{ maxWidth: 'calc(100% - 84px)' }}
        >
          {displayedNames
            ?.map(profile => profile.name || truncateAddress(profile.address))
            .join(', ')}{' '}
          {resultLength > 2 &&
            `and ${resultLength - 2} ${resultLength === 3 ? 'other' : 'others'} you know`}{' '}
          {resultLength === 1 ? 'follows' : 'follow'} them
        </p>
      )}
    </div>
  )
}

export default CommonFollowers
