export const APP_NAME = 'EFP'
export const APP_DESCRIPTION = 'Ethereum Follow Protocol'
export const APP_URL =
  process.env['NEXT_PUBLIC_VERCEL_URL'] ||
  process.env['NEXT_PUBLIC_SITE_URL'] ||
  'http://localhost:4321'

export const ENS_SUBGRAPH = `https://api.thegraph.com/subgraphs/name/ensdomains/ens`

export const SECOND = 1_000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY
