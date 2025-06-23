import { useMemo } from 'react'
import { useIsClient } from '@uidotdev/usehooks'
import { isChrome } from '#/utils/browser-detection'

/**
 * Hook that returns the 'disable-blur' class only for Chrome browsers
 * since nested blur effects are only broken in Chrome
 * @returns 'disable-blur' if Chrome browser, empty string otherwise
 */
export function useChromeDisableBlur(): string {
  const isClient = useIsClient()

  const disableBlurClass = useMemo(() => {
    if (!isClient) return ''
    return isChrome() ? 'disable-blur' : ''
  }, [isClient])

  return disableBlurClass
}
