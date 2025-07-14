/**
 * Browser-safe utilities that check for browser environment before using browser APIs
 */

export const safeNavigator = {
  language: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
  userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
}

export const safeWindow = {
  innerWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
  innerHeight: typeof window !== 'undefined' ? window.innerHeight : 768,
}

export const safeDocument = {
  querySelector: (selector: string) => 
    typeof document !== 'undefined' ? document.querySelector(selector) : null,
}

export const isClientSide = () => typeof window !== 'undefined'

export const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'