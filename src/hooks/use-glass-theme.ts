import { useTheme } from 'next-themes'
import { useIsClient } from '@uidotdev/usehooks'

export const useGlassTheme = () => {
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient()

  // Use resolvedTheme for proper hydration, fallback during SSR
  const currentTheme = isClient ? resolvedTheme : null
  const isGlassEnabled = currentTheme === 'glass-light' || currentTheme === 'glass-dark'
  const glassMode = currentTheme === 'glass-light' ? 'light' : currentTheme === 'glass-dark' ? 'dark' : null

  const getGlassClass = (glassClass: string, fallbackClass: string = '') => {
    return isGlassEnabled ? glassClass : fallbackClass
  }

  // Helper for tooltip backgrounds
  const getTooltipClass = () => getGlassClass('liquid-glass-tooltip', 'tooltip-fallback')

  // Helper for common navigation glass patterns
  const getNavClass = () => getGlassClass('glass-pseudo-nav', 'glass-fallback-nav')
  const getMobileNavClass = () => getGlassClass('glass-pseudo-nav', 'glass-fallback-nav')
  const getDropdownClass = () => getGlassClass('liquid-glass-dropdown-static', 'glass-fallback-dropdown')
  const getItemClass = () => getGlassClass('glass-pseudo-item', 'glass-fallback-item')
  const getPrimaryClass = () => getGlassClass('liquid-glass-primary', 'glass-fallback-primary')

  return {
    isGlassEnabled,
    glassMode,
    getGlassClass,
    getTooltipClass,
    getNavClass,
    getMobileNavClass,
    getDropdownClass,
    getItemClass,
    getPrimaryClass,
  }
}
