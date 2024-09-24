import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '#/components/avatar'
import LoadingCell from '#/components/loaders/loading-cell'
import { fetchRecommendations } from '#/api/fetchRecommendations'
import { zeroAddress } from 'viem'

const SocialGraphArt = () => {
  const { isLoading, data: socialGraphProfiles } = useQuery({
    queryKey: ['social graph profiles'],
    queryFn: async () => {
      const fetchedAccounts = await fetchRecommendations('recommended', zeroAddress, undefined, 16)

      return fetchedAccounts
    },
    staleTime: Infinity
  })

  return (
    <div className='svg-container'>
      <div className='path path1' />
      <div className='path path2' />
      <div className='path path3' />
      <div className='path path4' />
      <div className='path path5' />
      <div className='path path6' />
      <div className='path path7' />
      <div className='path path8' />
      <div className='path path9' />
      <div className='path path10' />
      <div className='path path11' />
      <div className='path path12' />
      <div className='path path13' />
      <div className='path path14' />
      <div className='path path15' />
      <div className='path path16' />
      <div className='circle circle1'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href='/0xE2Cded674643743ec1316858dFD4FD2116932E63'>
            <Avatar
              avatarUrl='https://metadata.ens.domains/mainnet/avatar/efp.eth'
              name='efp.eth'
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle2'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[0]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[0]?.avatar}
              name={socialGraphProfiles?.[0]?.name || socialGraphProfiles?.[0]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle3'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[1]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[1]?.avatar}
              name={socialGraphProfiles?.[1]?.name || socialGraphProfiles?.[1]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle4'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[2]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[2]?.avatar}
              name={socialGraphProfiles?.[2]?.name || socialGraphProfiles?.[2]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle5'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[3]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[3]?.avatar}
              name={socialGraphProfiles?.[3]?.name || socialGraphProfiles?.[3]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle6'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[4]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[4]?.avatar}
              name={socialGraphProfiles?.[4]?.name || socialGraphProfiles?.[4]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle7'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[5]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[5]?.avatar}
              name={socialGraphProfiles?.[5]?.name || socialGraphProfiles?.[5]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle8'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[6]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[6]?.avatar}
              name={socialGraphProfiles?.[6]?.name || socialGraphProfiles?.[6]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle9'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[7]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[7]?.avatar}
              name={socialGraphProfiles?.[7]?.name || socialGraphProfiles?.[7]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle10'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[8]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[8]?.avatar}
              name={socialGraphProfiles?.[8]?.name || socialGraphProfiles?.[8]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle11'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[9]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[9]?.avatar}
              name={socialGraphProfiles?.[9]?.name || socialGraphProfiles?.[9]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle12'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[10]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[10]?.avatar}
              name={socialGraphProfiles?.[10]?.name || socialGraphProfiles?.[10]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle13'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[11]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[11]?.avatar}
              name={socialGraphProfiles?.[11]?.name || socialGraphProfiles?.[11]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle14'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[12]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[12]?.avatar}
              name={socialGraphProfiles?.[12]?.name || socialGraphProfiles?.[12]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle15'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[13]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[13]?.avatar}
              name={socialGraphProfiles?.[13]?.name || socialGraphProfiles?.[13]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle16'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[14]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[14]?.avatar}
              name={socialGraphProfiles?.[14]?.name || socialGraphProfiles?.[14]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
      <div className='circle circle17'>
        {isLoading ? (
          <LoadingCell className='h-full w-full rounded-full' />
        ) : (
          <Link href={`/${socialGraphProfiles?.[15]?.address}`}>
            <Avatar
              avatarUrl={socialGraphProfiles?.[15]?.avatar}
              name={socialGraphProfiles?.[15]?.name || socialGraphProfiles?.[15]?.address || ''}
              size='h-full w-full'
            />
          </Link>
        )}
      </div>
    </div>
  )
}

export default SocialGraphArt
