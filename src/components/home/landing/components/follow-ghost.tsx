import Image from 'next/image'
import Line from 'public/assets/lines/line-3.svg'
import FriendsEnemies from 'public/assets/art/friends-enemies.png'

const FollowGhost = () => {
  return (
    <div className='flex flex-row gap-32 xl:gap-48 items-center relative'>
      <div className='text-5xl xl:text-6xl font-bold w-fit leading-[58px] xl:leading-[70px] px-8 py-4 border-[3px] border-[#ffa5b8] rounded-2xl'>
        <p>Follow your friends.</p>
        <p className='text-[#ffa5b8]'>Ghost your enemies.</p>
      </div>
      <Image
        src={FriendsEnemies}
        alt='Social Graph'
        width={400}
        height={262}
        className='pointer-events-none'
      />
      <Image
        src={Line}
        alt='line'
        width={441}
        height={301}
        className='pointer-events-none absolute w-[470px] xl:w-[441px] top-[175px] xl:top-[185px] left-[370px] xl:left-[450px]'
      />
    </div>
  )
}

export default FollowGhost
