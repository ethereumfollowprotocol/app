import { Avatar as RadixAvatar } from '@radix-ui/themes'

interface AvatarProps {
  name: string // ENS name or address
  avatarUrl?: string
  size?: '1' | '2' | '3' | '4' // Add more when needed
}

export function Avatar({ name, avatarUrl, size = '4' }: AvatarProps) {
  return (
    <RadixAvatar
      alt="User's avatar"
      className='auto rounded-full my-auto'
      size={size}
      fallback={
        <RadixAvatar src='/assets/gradient-circle.svg' radius='full' size={size} fallback='' />
      }
      src={avatarUrl || `${process.env.NEXT_PUBLIC_ENS_API_URL}/i/${name}`}
    />
  )
}
