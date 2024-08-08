import type { LeaderboardFilter } from '#/types/common'

export const formatQueryParams = (
  inputs: Record<string, string | number | string[] | LeaderboardFilter | null | undefined>
) =>
  Object.entries(inputs)
    .filter(([, value]) => !!value)
    .map(([param, value]) => {
      if (Array.isArray(value)) {
        return `${param}=${value.join(',')}`
      }

      return `${param}=${value}`
    })
    .join('&')
// [
