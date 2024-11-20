import type { Address } from 'viem'
import { normalize } from 'viem/ens'
import { ENS_SUBGRAPH_URL } from '#/lib/constants'

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
  const sanitizedSearch = normalize(search.trim())
  if (search.length === 0) return []

  const response = await fetch(ENS_SUBGRAPH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: searchQuery,
      variables: { search: sanitizedSearch },
      operationName: 'SearchQuery'
    })
  })

  if (!response.ok) return []

  const json = (await response.json()) as {
    data: { domains: { name: string; resolvedAddress: { id: Address } | null }[] }
  }

  return json.data.domains
    .filter(domain => !!domain.resolvedAddress)
    .sort((a, b) => a.name.length - b.name.length)
}
