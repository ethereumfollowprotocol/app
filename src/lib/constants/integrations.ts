import type { StaticImageData } from 'next/image'
import Interface from 'public/assets/partners/interface.jpeg'

export const INTEGRATIONS = [
  {
    name: 'Interface',
    url: 'https://interface.social',
    logo: Interface
  }
] as {
  name: string
  url: string
  logo: string | StaticImageData
}[]
