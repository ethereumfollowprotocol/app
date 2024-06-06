import { ENS_SUBGRAPH } from '#/lib/constants'

const searchENSNames = async ({ search }: { search: string }) => {
  const sanitizedSearch = search.trim().toLowerCase()
  if (search.length === 0) return []

  const response = await fetch(ENS_SUBGRAPH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: /*GraphQL*/ `
        query SearchQuery($search: String) {
          domains(
            first: 15
            orderBy: id
            orderDirection: asc
            where: {and: [{name_starts_with: $search}, {name_ends_with: ".eth"}]}
          ) {
            name
            registration { registrationDate }
          }
        }`,
      variables: { search: sanitizedSearch },
      operationName: 'SearchQuery'
    })
  })

  if (!response.ok) return []

  const json = (await response.json()) as {
    data: { domains: { name: string; registration: { registrationDate: string } | null }[] }
  }

  return json.data.domains
    .filter(domain => !!domain.registration)
    .map(domain => domain.name)
    .sort((a, b) => a.length - b.length)
}

export default searchENSNames
