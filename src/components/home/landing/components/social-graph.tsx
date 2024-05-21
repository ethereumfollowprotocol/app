import Image from 'next/image'
import SocialGraphImage from 'public/assets/art/social-graph.png'
import Line from 'public/assets/lines/line-2.svg'

export default function SocialGraph() {
  return (
    <div className='flex flex-row-reverse gap-32 xl:gap-48 items-center relative'>
      <p className='text-5xl xl:text-6xl font-bold w-108 xl:w-[560px] leading-[58px] xl:leading-[70px] pl-8 py-4 border-[3px] border-[#ffc18a] rounded-2xl'>
        The social graph <span className='text-[#ffb4a1]'>for Ethereum.</span>
      </p>
      <Image
        src={SocialGraphImage}
        alt='Social Graph'
        width={500}
        height={500}
        className='pointer-events-none w-[450px] h-[450px] xl:h-[500px] xl:w-[500px]'
      />
      <Image
        src={Line}
        alt='line'
        width={418}
        height={301}
        className='pointer-events-none absolute top-[300px] left-[340px] xl:top-[336px] xl:left-[440px]'
      />
    </div>
  )
}
