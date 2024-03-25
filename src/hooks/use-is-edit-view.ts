import { usePathname } from 'next/navigation'

/**
 * @description Returns whether the user can "edit" or update the cart based on the current page
 * @returns {boolean}
 */
export const useIsEditView = (): boolean => {
  const pathname = usePathname()
  const isEditor = pathname === '/editor'
  const isProfile = pathname === '/profile'
  return isEditor || isProfile
}
