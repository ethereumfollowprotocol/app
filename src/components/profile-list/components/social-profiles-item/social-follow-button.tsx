import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import type { ProfileListProfile } from '../..'
import { useCart } from '#/contexts/cart-context'
import MainnetBlack from 'public/assets/mainnet-black.svg'

interface SocialFollowButtonProps {
  profiles: ProfileListProfile[]
}

const SocialFollowButton: React.FC<SocialFollowButtonProps> = ({ profiles }) => {
  const { t } = useTranslation()
  const { cartItems, setCartItems } = useCart()

  const removeCarItems = async () => {
    const address = profiles?.[0]?.address
    if (!address) return []

    const addresses = profiles.map(({ address }) => address.toLowerCase())

    const filteredCartItems = cartItems.filter(
      (item) => !addresses.includes(item.listOp.data.slice(0, 42).toLowerCase())
    )

    setCartItems(filteredCartItems)
  }

  return (
    <button
      onClick={() => removeCarItems()}
      className='btn-following-pending text-darkGrey hover:bg-none hover:bg-[#D0D0D0] transition-transform hover:scale-[1.15] hover:border-none after:absolute after:h-4 after:w-4 after:rounded-full after:-top-2 after:-right-2 after:bg-green-400 rounded-xl relative 2xl:text-sm text-[13px] flex items-center gap-1.5 justify-center font-bold h-9 2xl:h-[40px] w-[110px] 2xl:w-[120px] px-2'
    >
      <Image alt='mainnet logo' src={MainnetBlack} width={14} className='w-[14px] 2xl:w-[16px]' />
      {t('following')}
    </button>
  )
}

export default SocialFollowButton
