'use server'

async function fetchLeaderboard({
  filter
}: {
  filter: 'following' | 'followers' | 'mutuals' | 'blocked+muted'
}) {
  const response = await fetch(`https://api.ethfollow.xyz/api/v1/leaderboard/${filter}`)
  const data = await response.json()
  return data
}
