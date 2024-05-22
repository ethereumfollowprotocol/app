import Image from 'next/image'
import SocialGraph from './components/social-graph'
import FollowGhost from './components/follow-ghost'
import LineDesktop from 'public/assets/lines/desktop/line-1.svg'
import LineMobile from 'public/assets/lines/mobile/line-1.svg'
import FollowerList from './components/follower-list'
import LaunchPartners from './components/launch-partners'

const Landing = () => {
  return (
    <div className='mt-20 px-4 md:mt-36 lg:mt-44 xl:mt-52 2xl:mt-[15vw] gap-[50px] lg:gap-[150px] flex flex-col items-center mb-[100px] lg:mb-[170px]'>
      <div className='relative'>
        <p className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold'>
          It&apos;s about <span className='text-[#ffc056]'>who</span> you know.{' '}
          <span className='hidden sm:inline'>😜</span>
          <Image
            src={LineDesktop}
            alt='line'
            width={79}
            height={420}
            className='pointer-events-none absolute lg:block hidden top-[42px] w-[71px] xl:w-[79px] left-[310px] xl:top-[53px] xl:left-[388px]'
          />
          <Image
            src={LineMobile}
            alt='line'
            width={3}
            className='lg:hidden pointer-events-none absolute top-[28px] left-[194px] md:top-[32px] md:left-[234px]'
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
