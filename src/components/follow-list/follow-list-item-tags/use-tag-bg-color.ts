import { useCart } from '#/contexts/cart-context'
import type { ListOpTagOpParams } from '#/types/list-op'

export const useTagBgColor = ({ address, tag }: ListOpTagOpParams) => {
  const { hasListOpAddTag, hasListOpRemoveTag } = useCart()

  const getTagBgColor = ({ address, tag }: ListOpTagOpParams) =>
    hasListOpAddTag({ address, tag })
      ? 'bg-lime-500'
      : hasListOpRemoveTag({ address, tag })
        ? 'bg-salmon-400'
        : 'bg-white'

  return getTagBgColor({ address, tag })
}
