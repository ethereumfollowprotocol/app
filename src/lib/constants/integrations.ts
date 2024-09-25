import type { StaticImageData } from 'next/image'

import WebHash from 'public/assets/partners/webhash.jpeg'
import Interface from 'public/assets/partners/interface.jpeg'
import LikeButton from 'public/assets/partners/likebutton.jpeg'

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
  },
  {
    name: 'Webhash',
    url: 'https://webhash.com',
    logo: WebHash
  }
] as {
  name: string
  url: string
  logo: string | StaticImageData
}[]
