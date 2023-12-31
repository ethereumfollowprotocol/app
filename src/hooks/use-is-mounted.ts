import * as React from 'react'

export function useIsMounted() {
  const [isMounted, setIsMounted] = React.useState(false)
  // biome-ignore lint/correctness/useExhaustiveDependencies: lorem ipsum
  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  return isMounted
}
