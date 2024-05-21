import Image from 'next/image'
import SocialGraph from './components/social-graph'
import FollowGhost from './components/follow-ghost'
import Line from 'public/assets/lines/line-1.svg'
import FollowerList from './components/follower-list'
import LaunchPartners from './components/launch-partners'

const Landing = () => {
  return (
    <div className=' mt-44 xl:mt-52 2xl:mt-[15vw] gap-[150px] flex flex-col items-center mb-[170px]'>
      <div className='relative'>
        <p className='text-5xl xl:text-6xl font-bold'>
          It&apos;s about <span className='text-[#ffc056]'>who</span> you know. 😜
          <Image
            src={Line}
            alt='line'
            width={79}
            height={420}
            className='pointer-events-none absolute top-[42px] w-[75px] xl:w-[79px] left-[310px] xl:top-[53px] xl:left-[388px]'
          />
        </p>
      </div>
      <SocialGraph />
      <FollowGhost />
      <FollowerList />
      <LaunchPartners />
    </div>
  )
}

export default Landing
