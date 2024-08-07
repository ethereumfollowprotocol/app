import clsx from 'clsx'
import Image from 'next/image'
import type { GetEnsAvatarReturnType } from 'viem'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'

interface AvatarProps {
  name: string // ENS name or address
  avatarUrl?: string | GetEnsAvatarReturnType
  size?: string
  onClick?: () => void
}

export const Avatar = ({
  name,
  onClick,
  avatarUrl,
  size = 'h-[70px] w-[70px] md:h-[100px] md:w-[100px]'
}: AvatarProps) => {
  return (
    <Image
      alt={`${name}'s avatar`}
      className={clsx('auto rounded-full my-auto ', size)}
      height={50}
      width={50}
      onClick={() => {
        if (onClick) onClick()
      }}
      src={avatarUrl || DefaultAvatar}
      unoptimized={true}
    />
  )
}
