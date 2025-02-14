import { useEffect, useState } from 'react'
import Image, { type ImageProps, type StaticImageData } from 'next/image'
import { DEFAULT_AVATAR_URL } from '#/lib/constants'

interface ImageWithFallbackProps extends ImageProps {
  fallback?: StaticImageData | string
  alt: string
  src: string
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ fallback = DEFAULT_AVATAR_URL, alt, src, ...props }) => {
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
      src={error ? fallback : src}
      {...props}
    />
  )
}

export default ImageWithFallback
