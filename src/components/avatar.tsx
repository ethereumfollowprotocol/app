import clsx from 'clsx'
import Image from 'next/image'
import DefaultAvatar from 'public/assets/art/default-avatar.svg'

interface AvatarProps {
  name: string // ENS name or address
  avatarUrl?: string
  size?: string
  height?: `${number}` | number
  width?: `${number}` | number
}

export const Avatar = ({
  name,
  avatarUrl,
  size = 'h-[70px] w-[70px] md:h-[100px] md:w-[100px]'
}: AvatarProps) => {
  return (
    <Image
      alt="User's avatar"
      className={clsx('auto rounded-full my-auto ', size)}
      height={50}
      width={50}
      // src={avatarUrl || `${process.env.NEXT_PUBLIC_ENS_API_URL}/i/${name}` || DefaultAvatar}
      src={avatarUrl || DefaultAvatar}
    />
  )
}
