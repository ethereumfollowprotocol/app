'use client'

import * as React from 'react'
import Image from 'next/image'

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
const keyString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

function triplet(r: number, g: number, b: number) {
  return (
    keyString.charAt(r >> 2) +
    keyString.charAt(((r & 3) << 4) | (g >> 4)) +
    keyString.charAt(((g & 15) << 2) | (b >> 6)) +
    keyString.charAt(b & 63)
  )
}

function rgbDataURL(r: number, g: number, b: number) {
  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
}

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

  return (
    <Image
      src={imageSource}
      onError={updateFallback}
      placeholder='blur'
      blurDataURL={rgbDataURL(255, 255, 255)}
      {...rest}
    />
  )
}
