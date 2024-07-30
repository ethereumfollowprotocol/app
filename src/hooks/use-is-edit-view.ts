import { useAccount } from 'wagmi'
import { usePathname } from 'next/navigation'
import { useEFPProfile } from '#/contexts/efp-profile-context'

/**
 * @description Returns whether the user can "edit" or update the cart based on the current page
 * @returns {boolean}
 */
export const useIsEditView = (): boolean => {
  const pathname = usePathname()
  const { address: userAddress } = useAccount()
  const { selectedList, profile } = useEFPProfile()

  const isEditor = pathname === '/editor'
  const isProfile =
    (pathname.split('?')[0]?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
      selectedList === Number(profile?.primary_list)) ||
    pathname.split('?')[0] === `/${selectedList?.toString() ?? userAddress}`

  return isEditor || isProfile
}
