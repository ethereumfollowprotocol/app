import { Badge } from '@radix-ui/themes'
import type { Address } from 'viem'

export function Tag({
  address,
  tag,
  className = '',
  onClick
}: {
  address: Address
  tag: string
  className?: string
  onClick?: () => void
}) {
  const handleClick = () => {
    if (onClick) onClick()
  }
  return (
    <Badge
      key={address + tag}
      variant='solid'
      className={`text-black ${className}`}
      radius='full'
      onClick={handleClick}
    >
      {tag}
    </Badge>
  )
}
