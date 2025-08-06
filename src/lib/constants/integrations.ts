import type { StaticImageData } from 'next/image'

import PWN from 'public/assets/partners/pwn.png'
import POAP from 'public/assets/partners/poap.png'
import Namefi from 'public/assets/partners/namefi.png'
import EFPBot from 'public/assets/partners/efpbot.jpeg'
import Rocbox from 'public/assets/partners/rocbox.png'
import Payflow from 'public/assets/partners/payflow.png'
import WebHash from 'public/assets/partners/webhash.png'
import ENSBook from 'public/assets/partners/ensbook.png'
import EthDotCd from 'public/assets/partners/ethdotcd.png'
import Interface from 'public/assets/partners/interface.png'
import EnsVision from 'public/assets/partners/ensvision.png'
import WebThreeBio from 'public/assets/partners/web3bio.png'
import JustaName from 'public/assets/partners/justaname.png'
import EFPUpdates from 'public/assets/partners/efpupdates.jpeg'
import Blockscout from 'public/assets/partners/blockscout.png'
import LikeButton from 'public/assets/partners/likebutton.png'
import HarvestArt from 'public/assets/partners/harvestart.png'
import VibesScapes from 'public/assets/partners/vibesscapes.png'
import EngagementVision from 'public/assets/partners/engagementvision.png'
import DevconCollabPortal from 'public/assets/partners/devconcollabportal.png'
import DevconPassport from 'public/assets/partners/devconpassport.png'
import ETHTools from 'public/assets/partners/ethtools.png'
import Yodl from 'public/assets/partners/yodl.png'
import Snapshot from 'public/assets/partners/snapshot.png'
import BanklessAcademy from 'public/assets/partners/banklessacademy.png'
import ENSResolver from 'public/assets/partners/ensresolver.png'
import Rotki from 'public/assets/partners/rotki.png'
import Zapper from 'public/assets/partners/zapper.png'
import Recordsxyz from 'public/assets/partners/recordsxyz.png'
import Agora from 'public/assets/partners/agora.png'
import Lighthouse from 'public/assets/partners/lighthouse.jpeg'
import Pobstudio from 'public/assets/partners/pobstudio.jpeg'
import Dhive from 'public/assets/partners/dhive.jpeg'
import Phi from 'public/assets/partners/phi.jpeg'
import EFPFinder from 'public/assets/partners/efpfinder.jpeg'
import ENSTools from 'public/assets/partners/enstools.jpeg'
import CuriaLab from 'public/assets/partners/curialab.jpeg'
import ENStateSearch from 'public/assets/partners/enstatesearch.jpeg'
import Tally from 'public/assets/partners/tally.jpeg'
import EFPower from 'public/assets/partners/efpower.jpeg'
import NameGraph from 'public/assets/partners/namegraph.jpeg'
import Aragon from 'public/assets/partners/aragon.jpeg'
import Superfluid from 'public/assets/partners/superfluid.jpeg'
import ETHSF from 'public/assets/partners/ethsf.jpeg'
import ENSvolution from 'public/assets/partners/ensvolution.jpeg'
import IpeCity from 'public/assets/partners/ipecity.jpeg'
import CryptoPunksEthLimo from 'public/assets/partners/cryptopunks-eth-limo.jpeg'
import GeoCities from 'public/assets/partners/geocities.jpeg'
import CodeSwarmAI from 'public/assets/partners/codeswarmai.jpeg'
import Namespace from 'public/assets/partners/namespace.jpeg'
import Dappcon from 'public/assets/partners/dappcon.jpeg'
import DIDHub from 'public/assets/partners/didhub.jpeg'
import Philand from 'public/assets/partners/philand.jpeg'
import V1CryptoPunks from 'public/assets/partners/v1cryptopunks.jpeg'
import PrepunkVerify from 'public/assets/partners/prepunkverify.jpeg'
import MetaPoll from 'public/assets/partners/metapoll.jpeg'
import CommonGround from 'public/assets/partners/commonground.jpeg'
import Enscribe from 'public/assets/partners/enscribe.jpeg'
import SmithBox from 'public/assets/partners/smithbox.jpeg'
import CreatorScore from 'public/assets/partners/creatorscore.jpeg'
import EthStars from 'public/assets/partners/ethstars.jpeg'
import Paper from 'public/assets/partners/paper.jpeg'
import Ethbox from 'public/assets/partners/ethbox.jpeg'

export const INTEGRATIONS = [
  {
    name: 'Interface',
    url: 'https://interface.social',
    logo: Interface,
  },
  {
    name: 'Snapshot',
    url: 'https://snapshot.box/',
    logo: Snapshot,
  },
  {
    name: 'POAP',
    url: 'https://poap.xyz',
    logo: POAP,
  },
  {
    name: 'Tally',
    url: 'https://tally.xyz/',
    logo: Tally,
  },
  {
    name: 'Agora',
    url: 'https://www.agora.xyz/',
    logo: Agora,
  },
  {
    name: 'Aragon',
    url: 'https://www.aragon.org',
    logo: Aragon,
  },
  {
    name: 'Superfluid',
    url: 'https://superfluid.org/',
    logo: Superfluid,
  },
  {
    name: 'Yodl',
    url: 'https://yodl.me/',
    logo: Yodl,
  },
  {
    name: 'Vision',
    url: 'https://vision.io/',
    logo: EnsVision,
  },
  {
    name: 'Creator Score',
    url: 'https://www.creatorscore.app/',
    logo: CreatorScore,
  },
  {
    name: 'Ipê City',
    url: 'https://www.ipe.city/',
    logo: IpeCity,
  },
  {
    name: 'Namespace',
    url: 'https://namespace.ninja/',
    logo: Namespace,
  },
  {
    name: 'Rotki',
    url: 'https://rotki.com/',
    logo: Rotki,
  },
  {
    name: 'Blockscout',
    url: 'https://www.blockscout.com/',
    logo: Blockscout,
  },
  {
    name: 'Phi',
    url: 'https://phi.box/',
    logo: Phi,
  },
  {
    name: 'Philand',
    url: 'https://philand.xyz/',
    logo: Philand,
  },
  {
    name: 'Common Ground',
    url: 'https://app.cg',
    logo: CommonGround,
  },
  {
    name: 'Lighthouse',
    url: 'https://lighthouse.cx/',
    logo: Lighthouse,
  },
  {
    name: 'Zapper',
    url: 'https://zapper.xyz/',
    logo: Zapper,
  },
  {
    name: 'Paper',
    url: 'https://paper.ink/',
    logo: Paper,
  },
  {
    name: 'Blockverse',
    url: 'https://www.pob.studio/',
    logo: Pobstudio,
  },
  {
    name: 'Dappcon',
    url: 'https://vibes.dappcon.io/',
    logo: Dappcon,
  },
  {
    name: 'Dhive',
    url: 'https://dhive.io',
    logo: Dhive,
  },
  {
    name: 'Web3 Bio',
    url: 'https://web3.bio/',
    logo: WebThreeBio,
  },
  {
    name: 'Eth.box',
    url: 'https://eth.box/',
    logo: Ethbox,
  },
  {
    name: 'Enscribe',
    url: 'https://www.enscribe.xyz/',
    logo: Enscribe,
  },
  {
    name: 'Records.xyz',
    url: 'https://records.xyz',
    logo: Recordsxyz,
  },
  {
    name: 'LikeButton.eth',
    url: 'https://likebutton.eth.limo/',
    logo: LikeButton,
  },
  {
    name: 'Webhash',
    url: 'https://webhash.com',
    logo: WebHash,
  },
  {
    name: 'Bankless Academy',
    url: 'https://app.banklessacademy.com/',
    logo: BanklessAcademy,
  },
  {
    name: 'Payflow',
    url: 'https://payflow.me',
    logo: Payflow,
  },
  {
    name: 'eth.cd',
    url: 'https://eth.cd',
    logo: EthDotCd,
  },
  {
    name: 'ENS Tools',
    url: 'https://ens.tools',
    logo: ENSTools,
  },
  {
    name: 'DIDHub',
    url: 'https://beta.didhub.com/',
    logo: DIDHub,
  },
  {
    name: 'MetaPoll',
    url: 'https://metapoll.xyz/',
    logo: MetaPoll,
  },
  {
    name: 'NameGraph',
    url: 'https://www.namegraph.dev',
    logo: NameGraph,
  },
  {
    name: 'EFP Bot',
    url: 'https://x.com/efpbots',
    logo: EFPBot,
  },
  {
    name: 'EFP Updates',
    url: 'https://x.com/efp_updates',
    logo: EFPUpdates,
  },
  {
    name: 'PWN',
    url: 'https://pwn.xyz/',
    logo: PWN,
  },
  {
    name: 'Namefi',
    url: 'https://www.namefi.io/',
    logo: Namefi,
  },
  {
    name: 'ENSBook',
    url: 'https://ensbook.xyz/',
    logo: ENSBook,
  },
  {
    name: 'Roc Box',
    url: 'https://roc.box/',
    logo: Rocbox,
  },
  {
    name: 'Harvest.art',
    url: 'https://harvest.art/',
    logo: HarvestArt,
  },
  {
    name: 'Engagement Vision',
    url: 'https://engagement.vision/',
    logo: EngagementVision,
  },
  {
    name: 'JustaName',
    url: 'https://www.justaname.id/',
    logo: JustaName,
  },
  {
    name: 'Devcon VI Collab Portal',
    url: 'https://devcon.fileverse.io/devcon7/portal',
    logo: DevconCollabPortal,
  },
  {
    name: 'Devcon VI Passport',
    url: 'https://app.devcon.org/',
    logo: DevconPassport,
  },
  {
    name: 'Ethereum San Francisco',
    url: 'https://ethsf.fileverse.io/ethsf/portal',
    logo: ETHSF,
  },
  {
    name: 'ETH Tools',
    url: 'https://ethtools.com/',
    logo: ETHTools,
  },
  {
    name: 'ENS Resolver',
    url: 'https://adraffy.github.io/ens-normalize.js/test/resolver.html',
    logo: ENSResolver,
  },
  {
    name: 'EFP Finder',
    url: 'https://efp.jaxoo.xyz/',
    logo: EFPFinder,
  },
  {
    name: 'EFPower',
    url: 'https://www.efpower.fun/',
    logo: EFPower,
  },
  {
    name: 'ENState Search',
    url: 'https://search.enstate.rs/',
    logo: ENStateSearch,
  },
  {
    name: 'CuriaLab',
    url: 'https://www.curialab.xyz/',
    logo: CuriaLab,
  },
  {
    name: 'ENSvolution',
    url: 'https://www.ensvolution.xyz/',
    logo: ENSvolution,
  },
  {
    name: 'Prepunk Verify',
    url: 'https://verify.prepunk.club/',
    logo: PrepunkVerify,
  },
  {
    name: 'CryptoPunks.eth.limo',
    url: 'https://cryptopunks.eth.limo/',
    logo: CryptoPunksEthLimo,
  },
  {
    name: 'V1 CryptoPunks',
    url: 'https://v1cryptopunks.com/',
    logo: V1CryptoPunks,
  },
  {
    name: 'GeoCities',
    url: 'https://geocities.eth.link/',
    logo: GeoCities,
  },
  {
    name: 'EthStars',
    url: 'https://ethstars.info/',
    logo: EthStars,
  },
  {
    name: 'Vibes',
    url: 'https://vibes.scapes.xyz/',
    logo: VibesScapes,
  },
  {
    name: 'CodeSwarm.ai',
    url: 'https://codeswarm.ai/',
    logo: CodeSwarmAI,
  },
  {
    name: 'Smith.box',
    url: 'https://smith.box/',
    logo: SmithBox,
  },
] as {
  name: string
  url: string
  logo: string | StaticImageData
}[]
