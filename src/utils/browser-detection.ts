/**
 * Detects if the current browser is Chrome
 * @returns true if the browser is Chrome, false otherwise
 */
export function isChrome(): boolean {
  if (typeof navigator === 'undefined') {
    return false
  }

  const userAgent = navigator.userAgent.toLowerCase()

  // Check for Chrome but exclude Edge (which also contains 'chrome' in user agent)
  return userAgent.includes('chrome') && !userAgent.includes('edg')
}
