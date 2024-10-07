import type { StaticImageData } from 'next/image'

import EFPBot from 'public/assets/partners/efpbot.jpeg'
import Payflow from 'public/assets/partners/payflow.jpeg'
import WebHash from 'public/assets/partners/webhash.jpeg'
import EthDotCd from 'public/assets/partners/ethdotcd.jpeg'
import Interface from 'public/assets/partners/interface.jpeg'
import EFPUpdates from 'public/assets/partners/efpupdates.jpeg'
import LikeButton from 'public/assets/partners/likebutton.jpeg'
import PWN from 'public/assets/partners/pwn.jpeg'
import EnsVision from 'public/assets/partners/ensvision.jpeg'
import Namefi from 'public/assets/partners/namefi.jpeg'
import ENSBook from 'public/assets/partners/ensbook.jpeg'
import VibesScapes from 'public/assets/partners/vibesscapes.jpeg'
import WebThreeBio from 'public/assets/partners/web3bio.jpeg'
import Blockscout from 'public/assets/partners/blockscout.jpeg'


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
  },
  {
    name: 'Payflow',
    url: 'https://payflow.me',
    logo: Payflow
  },
  {
    name: 'eth.cd',
    url: 'https://eth.cd',
    logo: EthDotCd
  },
  {
    name: 'EFP Bot',
    url: 'https://x.com/efpbots',
    logo: EFPBot
  },
  {
    name: 'EFP Updates',
    url: 'https://x.com/efp_updates',
    logo: EFPUpdates
  },
  {
    name: 'PWN',
    url: 'https://pwn.xyz/',
    logo: PWN
  },
  {
    name: 'Vision',
    url: 'https://vision.io/',
    logo: EnsVision
  },
  {
    name: 'Namefi',
    url: 'https://www.namefi.io/',
    logo: Namefi
  },
  {
    name: 'ENSBook',
    url: 'https://ensbook.xyz/',
    logo: ENSBook
  },
  {
    name: 'Vibes',
    url: 'https://vibes.scapes.xyz/',
    logo: VibesScapes
  },
  {
    name: 'Web3 Bio',
    url: 'https://web3.bio/',
    logo: WebThreeBio
  },
  {
    name: 'Blockscout',
    url: 'https://www.blockscout.com/',
    logo: Blockscout
  }
] as {
  name: string
  url: string
  logo: string | StaticImageData
}[]
