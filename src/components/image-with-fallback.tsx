'use client'

import * as React from 'react'
import Image from 'next/image'

export function ImageWithFallback({
  src,
  fallback = '/assets/gradient-circle.svg',
  ...rest
}: React.ComponentProps<typeof Image> & { src: string; fallback?: string }) {
  const [imageSource, setImageSource] = React.useState<string>(src)

  React.useEffect(() => {
    setImageSource(src)
  }, [src])

  const updateFallback = (_event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageSource(fallback)
  }

  return <Image src={imageSource} onError={updateFallback} {...rest} />
}
