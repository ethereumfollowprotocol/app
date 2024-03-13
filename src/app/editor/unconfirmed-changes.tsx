import { useConnectedProfile, useProfile } from '#/api/actions'
import { FollowList } from '#/components/follow-list'

export function UnconfirmedChanges() {
  const { profile: connectedProfile } = useConnectedProfile()
  const { following } = useProfile('brantley.eth') // TODO use connected address; just mocking right now

  if (!connectedProfile) return null
  if (!following) return null
  return <FollowList profiles={following} />
}
