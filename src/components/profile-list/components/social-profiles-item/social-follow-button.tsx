import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import type { ProfileListProfile } from '../..'
import { useCart } from '#/hooks/use-cart'
import MainnetBlack from 'public/assets/mainnet-black.svg'

interface SocialFollowButtonProps {
  profiles: ProfileListProfile[]
}

const SocialFollowButton: React.FC<SocialFollowButtonProps> = ({ profiles }) => {
  const { t } = useTranslation()
  const { cart, setCart } = useCart()

  const removeCarItems = async () => {
    const address = profiles?.[0]?.address
    if (!address) return []

    const addresses = profiles.map(({ address }) => address.toLowerCase())

    const filteredCartItems = cart.filter((item) => !addresses.includes(item.listOp.data.slice(0, 42).toLowerCase()))
    setCart(filteredCartItems)
  }

  return (
    <button
      onClick={() => removeCarItems()}
      className='btn-following-pending text-darkGrey relative flex h-9 w-[110px] items-center justify-center gap-1.5 rounded-xl px-2 text-[13px] font-bold transition-transform after:absolute after:-top-2 after:-right-2 after:h-4 after:w-4 after:rounded-full after:bg-green-400 hover:scale-[1.15] hover:border-none hover:bg-[#D0D0D0] hover:bg-none 2xl:h-[40px] 2xl:w-[120px] 2xl:text-sm'
    >
      <Image alt='mainnet logo' src={MainnetBlack} width={14} className='w-[14px] 2xl:w-[16px]' />
      {t('following')}
    </button>
  )
}

export default SocialFollowButton
