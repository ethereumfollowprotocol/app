import Image from 'next/image'

interface AvatarProps {
  name: string // ENS name or address
  avatarUrl?: string
  height?: `${number}` | number
  width?: `${number}` | number
}

export const Avatar = ({ name, avatarUrl, height = 50, width = 50 }: AvatarProps) => {
  return (
    <Image
      alt="User's avatar"
      className='auto rounded-full my-auto h-[70px] w-[70px] md:h-[100px] md:w-[100px]'
      height={height}
      width={width}
      src={
        avatarUrl ||
        `${process.env.NEXT_PUBLIC_ENS_API_URL}/i/${name}` ||
        '/assets/gradient-circle.svg'
      }
    />
  )
}
