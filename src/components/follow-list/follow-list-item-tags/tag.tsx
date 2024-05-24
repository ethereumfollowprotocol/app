import clsx from 'clsx'
import type { Address } from 'viem'
import { useCart } from '#/contexts/cart-context'
import { useTagBgColor } from './use-tag-bg-color'
import { useIsEditView } from '#/hooks/use-is-edit-view'

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
    <div
      key={address + tag}
      className={clsx(
        `text-black rounded-full`,
        bgColor,
        isEditView && 'cursor-pointer',
        className
      )}
      onClick={() => handleTagClick({ address, tag })}
    >
      {tag}
    </div>
  )
}
