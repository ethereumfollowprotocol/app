export const formatQueryParams = ({
  limit,
  offset,
  sort,
  tags
}: {
  limit?: string | number
  offset?: string | number
  sort?: string
  tags?: string[]
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
    }
  ]
    .filter(param => !!param.value)
    .map(param => `${param.param}=${param.value}`)
    .join('&')
