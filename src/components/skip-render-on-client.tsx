import * as React from 'react'
import { useIsFirstRender } from '#hooks/use-is-first-render.ts'

export function SkipRenderOnClient({
  children,
  shouldRenderOnClient
}: {
  children: React.ReactNode
  shouldRenderOnClient: () => boolean
}) {
  const id = React.useId()
  const isClient = typeof window !== 'undefined'
  const isFirstRender = useIsFirstRender()

  if (isClient && isFirstRender && shouldRenderOnClient() === false) {
    const element = document.getElementById(id)
    if (element) element.remove()
  }

  const shouldRender = isClient ? shouldRenderOnClient() : true

  return <div id={id}>{shouldRender ? children : null}</div>
}
