import { track } from '@vercel/analytics/react'
import { safeNavigator } from './browser-safe'

export const triggerCustomEvent = (eventName: string) => {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  if (regex.test(safeNavigator.userAgent)) track(`${eventName} - Mobile`)
  else track(`${eventName} - Desktop`)
}
