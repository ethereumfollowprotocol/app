import { normalize } from 'viem/ens'
import type { SearchENSNameResults } from '#/types/requests'

const searchQuery = /*GraphQL*/ `
  query SearchQuery($search: String) {
    domains(
      where: {and: [{name_starts_with: $search}]}
      orderBy: labelName
      orderDirection: asc
    ) {
      name
      resolvedAddress { id }
    }
  }
`

export const searchENSNames = async ({ search }: { search: string }) => {
  try {
    const sanitizedSearch = normalize(search.trim())
    if (search.length === 0) return []

    const response = await fetch('https://api.grails.app/api/v1/subgraph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: searchQuery,
        variables: { search: sanitizedSearch },
        operationName: 'SearchQuery',
      }),
    })

    if (!response.ok) return []

    const json = (await response.json()) as { data: SearchENSNameResults }

    // Filter out domains that don't have a resolved address and sort by name length
    return json.data.domains.filter((domain) => !!domain.resolvedAddress).sort((a, b) => a.name.length - b.name.length)
  } catch (error) {
    return []
  }
}
