import Image from 'next/image'
import { getI18n } from '#locales/server.ts'
import { Flex, Text } from '@radix-ui/themes'

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export default async function Home() {
  const t = await getI18n()
  return (
    <main className='mx-auto flex h-full min-h-full w-full flex-col items-center overflow-scroll px-4 pt-8 text-center'>
      <Text className='text-4xl font-bold text-white'>{t("It's about who you know.")}</Text>
      <Flex direction={'column'}>
        <Text className='text-4xl font-bold text-white'>{t('The social graph')}</Text>
        <Text className='text-4xl font-bold text-[#FEF305]'>{t('for Ethereum.')}</Text>
      </Flex>

      <Image
        src={'/assets/landing-graph.png'}
        width={500}
        height={500}
        alt='Landing graph'
      />
      <Flex direction={'column'}>
        <Text className='text-4xl font-bold text-white'>{t('Follow your friends.')}</Text>
        <Text className='text-4xl font-bold text-[#FEF305]'>{t('Ghost your enemies.')}</Text>
      </Flex>
      <Text className='text-4xl font-bold text-white'>{t('A follower list you own')}</Text>
    </main>
  )
}
