import type { GetEnsAvatarReturnType } from 'viem'

import { cn } from '#/lib/utilities'
import { isLinkValid } from '#/utils/validity'
import ImageWithFallback from './image-with-fallback'
import { DEFAULT_AVATAR_URL } from '#/lib/constants'

interface AvatarProps {
  name: string // ENS name or address
  avatarUrl?: GetEnsAvatarReturnType
  size?: string
  onClick?: () => void
}

export const Avatar = ({
  name,
  onClick,
  avatarUrl,
  size = 'h-[70px] w-[70px] md:h-[100px] md:w-[100px]',
}: AvatarProps) => {
  return (
    <ImageWithFallback
      alt={`${name}'s avatar`}
      className={cn('aspect-square rounded-full object-cover', size)}
      height={50}
      width={50}
      onClick={() => onClick?.()}
      src={avatarUrl && isLinkValid(avatarUrl) ? avatarUrl : DEFAULT_AVATAR_URL}
      unoptimized={true}
    />
  )
}
