export const APP_NAME = 'EFP'
export const APP_DESCRIPTION = 'Ethereum Follow Protocol'
export const APP_URL =
  process.env['NEXT_PUBLIC_VERCEL_URL'] ||
  process.env['NEXT_PUBLIC_SITE_URL'] ||
  'http://localhost:4321'

export const ENS_SUBGRAPH = `https://api.thegraph.com/subgraphs/name/ensdomains/ens`

export const teamAddresses = [
  '0x983110309620D911731Ac0932219af06091b6744',
  '0xBdB41BfF7E828E2DC2d15EB67257455db818F1DC',
  '0xf4212614C7Fe0B3feef75057E88b2E77a7E23e83'
]

export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY
