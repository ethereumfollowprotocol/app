import { Badge } from '@radix-ui/themes'
import type { Address } from 'viem'
import { useTagBgColor } from './use-tag-bg-color'
import clsx from 'clsx'
import { useIsEditView } from '#/hooks/use-is-edit-view'

export function Tag({
  address,
  tag,
  className,
  onClick
}: {
  address: Address
  tag: string
  className?: string
  onClick?: () => void
}) {
  const isEditView = useIsEditView()
  const bgColor = useTagBgColor({ address, tag })
  const handleClick = () => {
    if (onClick) onClick()
  }
  return (
    <Badge
      key={address + tag}
      variant='solid'
      className={clsx(`text-black`, bgColor, isEditView && 'cursor-pointer', className)}
      radius='full'
      onClick={handleClick}
    >
      {tag}
    </Badge>
  )
}
