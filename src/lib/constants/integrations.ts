import type { StaticImageData } from 'next/image'
import Interface from 'public/assets/partners/interface.jpeg'
import LikeButton from 'public/assets/partners/likebutton.jpg'

export const INTEGRATIONS = [
  {
    name: 'Interface',
    url: 'https://interface.social',
    logo: Interface
  },
  {
    name: 'LikeButton.eth',
    url: 'https://likebutton.eth.limo/',
    logo: LikeButton
  }
] as {
  name: string
  url: string
  logo: string | StaticImageData
}[]
