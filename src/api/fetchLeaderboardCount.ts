export const fetchLeaderboardCount = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_EFP_API_URL}/leaderboard/count`
    const response = await fetch(url, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as { leaderboardCount: number }
    return data
  } catch (err: unknown) {
    return { leaderboardCount: 0 }
  }
}
