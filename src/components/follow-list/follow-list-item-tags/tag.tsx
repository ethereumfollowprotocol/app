import { Badge } from '@radix-ui/themes'
import type { Address } from 'viem'
import { useTagBgColor } from './use-tag-bg-color'
import clsx from 'clsx'
import { useIsEditView } from '#/hooks/use-is-edit-view'
import { useCart } from '#/contexts/cart-context'

export function Tag({
  address,
  tag,
  className
}: {
  address: Address
  tag: string
  className?: string
}) {
  const { handleTagClick } = useCart()
  const isEditView = useIsEditView()
  const bgColor = useTagBgColor({ address, tag })
  return (
    <Badge
      key={address + tag}
      variant='solid'
      className={clsx(`text-black`, bgColor, isEditView && 'cursor-pointer', className)}
      radius='full'
      onClick={() => handleTagClick({ address, tag })}
    >
      {tag}
    </Badge>
  )
}
