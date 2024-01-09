import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.ts'

/**
 * A modified version of useEffect that's executed only one time, at the mounting time.
 * @link https://usehooks-ts.com/react-hook/use-effect-once
 */
export function useEffectOnce(effect: React.EffectCallback) {
  useIsomorphicLayoutEffect(effect, [])
}
