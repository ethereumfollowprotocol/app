import Link from 'next/link'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { Avatar } from '#/components/avatar'
import { FollowButton } from '#/components/follow-button'

// Mock data or prop structure for recommendation items
interface Recommendation {
  id: string
  address: `0x${string}`
  name: string
  avatarUrl?: string // Optional avatar URL
}

// Example recommendations data or fetched from an API
const recommendations: Recommendation[] = [
  { id: '1', name: 'Jane Doe', avatarUrl: '/path/to/avatar1.jpg', address: '0x1234567890' },
  { id: '2', name: 'John Smith', avatarUrl: '/path/to/avatar2.jpg', address: '0x1234567891' }
]

interface RecommendationsProps {
  header: string
}

export function Recommendations({ header }: RecommendationsProps) {
  return (
    <Flex gap='4' direction='column' className='w-full'>
      <Heading size='5' as='h2' className='text-left font-bold my-2'>
        {header}
      </Heading>
      <Flex gap='4' direction='column'>
        {recommendations.map(recommendation => (
          <RecommendationItem key={recommendation.id} recommendation={recommendation} />
        ))}
      </Flex>
    </Flex>
  )
}

function RecommendationItem({ recommendation }: { recommendation: Recommendation }) {
  const { name, avatarUrl, address } = recommendation
  return (
    <Flex className='items-center justify-between'>
      <Flex className='gap-2 items-center'>
        <Avatar name={name} avatarUrl={avatarUrl} />
        <Link href={`/${name}`} passHref={true}>
          <Text as='p' className='font-bold xl:text-lg lg:text-md text-sm hover:text-pink-400'>
            {name}
          </Text>
        </Link>
      </Flex>
      <FollowButton address={address} />
    </Flex>
  )
}
