import type { Address } from 'viem'
import { FollowButton } from '#/components/follow-button'
import { ImageWithFallback } from '#/components/image-with-fallback.tsx'

export interface TeamMember {
  ens: string
  address: Address
  x: string
  github: string
  avatar: string
}

export function TeamCard(props: TeamMember) {
  const { ens, address, avatar, x, github } = props
  return (
    <div className='flex flex-col'>
      <div className='mx-auto flex bg-white/70 border-0 max-w-80 w-[295px] min-w-60 rounded-xl p-3'>
        <div className='flex flex-col items-start justify-center h-full w-full'>
          <p>#1</p>
          <div className='flex flex-col items-center justify-center mx-auto mt-3'>
            <ImageWithFallback
              src={avatar}
              width={100}
              height={100}
              className='rounded-full'
              alt='avatar'
            />
            <p className='text-2xl font-bold my-2'>{ens}</p>
            <p className='text-blue rounded-full px-3'>TODO1</p>
            <div className='flex gap-3 my-3'>
              <FollowButton address={address} />
            </div>
          </div>
          <div className='flex justify-center mx-auto gap-8 text-center'>
            <div>
              <div className='text-2xl font-bold'>TODO2</div>
              <div className='font-bold text-gray-400 text-xl'>Following</div>
            </div>
            <div>
              <div className='text-2xl font-bold'>TODO3</div>
              <div className='font-bold text-gray-400 text-xl'>Followers</div>
            </div>
          </div>
          <div className='flex justify-center mx-auto mt-5 mb-4 text-center'>
            <div>
              <div className='text-2xl font-bold'>TODO4</div>
              <div className='font-bold text-gray-400 text-xl'>Leaderboard</div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 space-x-6'>
        <a href={x} target='_blank' rel='noreferrer' className='my-auto'>
          <button type='button' className='bg-white invert rounded-full p-2'>
            <img src='/assets/x.svg' alt='x.com icon' />
          </button>
        </a>
        <a href={github} target='_blank' rel='noreferrer' className='my-auto'>
          <button type='button' className='bg-white invert rounded-full p-2'>
            <img src='/assets/github.svg' alt='github icon' />
          </button>
        </a>
      </div>
    </div>
  )
}
