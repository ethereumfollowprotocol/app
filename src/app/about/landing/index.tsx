import Phrase from './components/phrase'
import SocialGraph from './components/social-graph'
import FollowGhost from './components/follow-ghost'
import SupportedBy from './components/supported-by'
import FollowerList from './components/follower-list'

const Landing = () => {
  return (
    <div className='mt-24 px-4 md:mt-36 lg:mt-44 xl:mt-60 gap-[46px] lg:gap-[150px] flex flex-col items-center mb-[100px] lg:mb-[170px]'>
      <Phrase />
      <SocialGraph />
      <FollowGhost />
      <FollowerList />
      <SupportedBy />
    </div>
  )
}

export default Landing
