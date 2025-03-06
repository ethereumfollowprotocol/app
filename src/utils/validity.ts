export const isLinkValid = (link?: string) => {
  if (!link) return false
  return link.includes('https://') || link.includes('http://') || link.includes('public/') || link.includes('/assets')
}
