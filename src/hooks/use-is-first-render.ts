import * as React from 'react'

export function useIsFirstRender(): boolean {
  const isFirstRender = React.useRef(true)

  if (isFirstRender.current) {
    isFirstRender.current = false
    return true
  }

  return false
}
