import * as React from 'react'

export function useIsomorphicLayoutEffect<T extends React.EffectCallback>(
  effect: T,
  deps?: React.DependencyList
) {
  return typeof window !== 'undefined'
    ? React.useEffect(effect, deps)
    : React.useLayoutEffect(effect, deps)
}
