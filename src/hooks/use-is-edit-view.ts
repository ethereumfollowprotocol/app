import { useMemo } from 'react'
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
  const { selectedList, lists } = useEFPProfile()

  const isEditor = pathname === '/cart'
  const isProfile =
    (pathname?.toLowerCase() === `/${userAddress?.toLowerCase()}` &&
      (selectedList ? selectedList === Number(lists?.primary_list) : true)) ||
    pathname === `/${selectedList?.toString() ?? userAddress}`

  const isEditView = useMemo(() => isEditor || isProfile, [pathname, isEditor, isProfile, selectedList, lists])
  return isEditView
}
