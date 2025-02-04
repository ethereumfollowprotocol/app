import { useEffect, useState } from 'react'
import Image, { type ImageProps, type StaticImageData } from 'next/image'

import DefaultAvatar from 'public/assets/art/default-avatar.svg'

interface ImageWithFallbackProps extends ImageProps {
  fallback?: StaticImageData | string
  alt: string
  src: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ fallback = DefaultAvatar, alt, src, ...props }) => {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
  }, [src])

  return (
    <Image
      alt={alt}
      data-loaded='false'
      onLoad={(event) => {
        event.currentTarget.setAttribute('data-loaded', 'true')
      }}
      onError={(event) => {
        setError('invalid image')
        event.currentTarget.setAttribute('data-loaded', 'true')
      }}
      loader={fallback}
      src={error ? fallback : src}
      {...props}
    />
  )
}

export default ImageWithFallback
