import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import type { FollowListProfile } from '..'
import { useCart } from '#/contexts/cart-context'
import MainnetBlack from 'public/assets/mainnet-black.svg'
import { listOpAddListRecord, listOpAddTag } from '#/utils/list-ops'

interface SocialFollowButtonProps {
  profiles: FollowListProfile[]
}

const SocialFollowButton: React.FC<SocialFollowButtonProps> = ({ profiles }) => {
  const { t } = useTranslation()
  const { getTagsFromCartByAddress, removeCartItem } = useCart()

  return (
    <button
      onClick={() => {
        const address = profiles?.[0]?.address
        if (!address) return []

        const tagsFromCart = getTagsFromCartByAddress(address)

        profiles.map(({ address }) => {
          tagsFromCart.map(tag => removeCartItem(listOpAddTag(address, tag)))
          removeCartItem(listOpAddListRecord(address))
        })
      }}
      className='btn-following-pending text-darkGrey hover:bg-none hover:bg-[#D0D0D0] transition-all hover:scale-110 after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400 rounded-xl relative text-sm flex items-center gap-1.5 justify-center font-bold h-[37px] px-2 py-1.5'
    >
      <Image alt='mainnet logo' src={MainnetBlack} width={16} />
      {t('following')}
    </button>
  )
}

export default SocialFollowButton
