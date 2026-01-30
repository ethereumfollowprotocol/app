import { track } from '@vercel/analytics/react'

export const triggerCustomEvent = (eventName: string) => {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  if (regex.test(userAgent)) track(`${eventName} - Mobile`)
  else track(`${eventName} - Desktop`)
}
