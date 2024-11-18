import { track } from '@vercel/analytics/react'

export const triggerCustomEvent = (eventName: string) => {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  if (regex.test(navigator.userAgent)) track(`${eventName} - Mobile`)
  else track(`${eventName} - Desktop`)
}
