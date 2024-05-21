import Image from 'next/image'
import Line from 'public/assets/lines/line-4.svg'
import FollowerListArt from 'public/assets/art/follower-list.png'

const FollowerList = () => {
  return (
    <div className='flex flex-row-reverse gap-40 xl:gap-52 items-center relative'>
      <div className='flex flex-col items-start text-5xl xl:text-6xl font-bold gap-4 px-8 py-6 border-[3px] border-[#ee90bc] rounded-2xl'>
        <p>A follower list </p>
        <p className='text-[#ee90bc]'>you own.</p>
      </div>
      <Image src={FollowerListArt} alt='Social Graph' width={350} height={262} />
      <Image
        src={Line}
        alt='line'
        width={3}
        height={154}
        className='absolute top-[165px] xl:top-[190px] left-[748px] xl:left-[768px]'
      />
    </div>
  )
}

export default FollowerList
