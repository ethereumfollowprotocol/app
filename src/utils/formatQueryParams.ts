import type { LeaderboardFilter } from '#/types/common'

export const formatQueryParams = ({
  limit,
  offset,
  sort,
  tags,
  filter
}: {
  limit?: string | number
  offset?: string | number
  sort?: string
  tags?: string[]
  filter?: LeaderboardFilter
}) =>
  [
    {
      param: 'limit',
      value: limit
    },
    {
      param: 'offset',
      value: offset
    },
    {
      param: 'sort',
      value: sort?.split(' ')[0]
    },
    {
      param: 'tags',
      value: tags?.join(',')
    },
    {
      param: 'filter',
      value: filter
    }
  ]
    .filter(param => !!param.value)
    .map(param => `${param.param}=${param.value}`)
    .join('&')
