'use client'

import { FollowButton } from '#/components/follow-button.tsx'
import { useEnsProfile } from '#/hooks/use-ens-profile.ts'
import { Avatar, Badge, Box, Card } from '@radix-ui/themes'

/**
 * TODO:
 * - Give this file a better name
 * - Add login for "follows you" badge
 * - impmenet "people you know follow them"
 */

export function CoolUserCard({ addressOrName }: { addressOrName: string }) {
  const { data, status, error } = useEnsProfile(addressOrName)

  if (status === 'error') {
    console.warn(`Error fetching profile for ${addressOrName}`, JSON.stringify(error, undefined, 2))
    return null
  }

  return (
    <Card
      className='rounded-[18px] flex flex-row w-[420px] h-[240px] pt-2 bg-white/90 mb-12'
      variant='ghost'
    >
      <div className='flex my-auto items-center justify-around'>
        <Avatar
          src={data?.avatar || '/assets/gradient-circle.svg'}
          fallback=''
          size='7'
          radius='full'
        />
        <div className='flex flex-col text-left -ml-2'>
          <label className='font-bold text-2xl'>{data?.name}</label>
          <Badge
            size='1'
            radius='full'
            className='font-bold text-[10px] bg-[#CDCDCD] text-[#333333] w-min'
          >
            Follows you
          </Badge>
        </div>
        <div className='self-start mt-6'>
          <FollowButton text='Follow' />
        </div>
      </div>
      <div className='mx-auto flex justify-center gap-x-10 mb-6 text-lg'>
        <Box>
          <p className='text-center font-bold'>203</p>
          <p className='text-sm'>Following</p>
        </Box>
        <Box>
          <p className='text-center font-bold'>1.1k</p>
          <p className='text-sm'>Followers</p>
        </Box>
      </div>
      <div className='self-baseline pb-2 flex justify-between space-x-4 px-3'>
        <div className='flex'>
          <Avatar
            alt='b'
            fallback=''
            size='1'
            src='https://metadata.ens.domains/mainnet/avatar/brantly.eth'
            className='rounded-full w-10 h-10'
          />
          <Avatar
            alt='b'
            fallback=''
            size='1'
            src='https://avatar-upload.ens-cf.workers.dev/mainnet/dr3a.eth?timestamp=1681787731836'
            className='rounded-full w-10 h-10 -ml-5'
          />
        </div>
        <p className='text-sm text-zinc-700 font-normal'>
          esm.eth, cory.eth, mattgarcia.eth, and 98 others you know follow them
        </p>
      </div>
    </Card>
  )
}
