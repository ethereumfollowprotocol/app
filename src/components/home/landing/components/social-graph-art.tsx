import Link from 'next/link'
import { zeroAddress } from 'viem'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import { truncateAddress } from '#/lib/utilities'
import LoadingCell from '#/components/loaders/loading-cell'
import { fetchRecommendations } from '#/api/fetchRecommendations'

const SocialGraphArt = () => {
  const { isLoading, data: socialGraphProfiles } = useQuery({
    queryKey: ['social graph profiles'],
    queryFn: async () => {
      const fetchedAccounts = await fetchRecommendations('recommended', zeroAddress, undefined, 17)

      return fetchedAccounts
    },
    staleTime: Infinity
  })

  return (
    <div className='svg-container'>
      {new Array(16).fill(0).map((_, i) => (
        <div key={i} className={`path path${i + 1}`} />
      ))}
      <div className='circle circle1 group'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <>
            <Link href='/0xE2Cded674643743ec1316858dFD4FD2116932E63'>
              <Avatar
                avatarUrl='https://metadata.ens.domains/mainnet/avatar/efp.eth'
                name='efp.eth'
                size='h-full w-full'
              />
            </Link>
            <div className='absolute hidden group-hover:block left-1/2 transform -translate-x-1/2 -top-8 py-0.5 px-2 text-sm border-2 border-grey bg-neutral/90 rounded-lg font-semibold'>
              efp.eth
            </div>
          </>
        )}
      </div>
      {new Array(16).fill(0).map((_, i) => {
        const profile = socialGraphProfiles?.[i + 1]

        return (
          <div key={i} className={`circle group z-10 circle${i + 2}`}>
            {isLoading ? (
              <LoadingCell className='h-full w-full rounded-full' />
            ) : (
              <>
                <Link href={`/${profile?.address}`}>
                  <Avatar
                    avatarUrl={profile?.avatar}
                    name={profile?.name || profile?.address || ''}
                    size='h-full w-full'
                  />
                </Link>
                <div className='absolute hidden group-hover:block left-1/2 transform -translate-x-1/2 -top-8 py-0.5 px-2 text-sm border-2 border-grey bg-neutral/90 rounded-lg font-semibold'>
                  {profile?.name || truncateAddress(profile?.address)}
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SocialGraphArt
