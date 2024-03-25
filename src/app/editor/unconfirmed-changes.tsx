import { FollowList } from '#/components/follow-list'
import { useCart } from '#/contexts/cart-context'
import { Box, Button, Text } from '@radix-ui/themes'

export function UnconfirmedChanges() {
  const { cartItems, totalCartItems, cartAddresses } = useCart()

  const handleConfirm = () => {
    console.log('Confirming changes')
  }

  if (!cartItems.length) return null // TODO handle no items in cart

  const profiles = cartAddresses.map(address => ({ address, tags: [] }))

  return (
    <>
      <FollowList
        profiles={profiles}
        listClassName='gap-2 p-4 rounded-xl bg-white/50'
        listItemClassName='rounded-xl p-2'
        showAddTag={true}
        showFollowsYouBadges={true}
        showTags={true}
      />
      <Box className='mr-8 flex justify-end'>
        <Box className='flex gap-6 p-6 bg-white rounded-xl'>
          <Box className='flex gap-2 items-center'>
            <Text size='8' weight='bold'>
              {totalCartItems}
            </Text>
            <Box className='flex flex-col text-right'>
              <Text size='1' weight='bold'>
                Unconfirmed
              </Text>
              <Text size='1' weight='bold'>
                Changes
              </Text>
            </Box>
          </Box>
          <Button
            className='bg-gradient-to-b from-kournikova-300 to-salmon-400 text-black'
            radius='full'
            onClick={handleConfirm}
            size='3'
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </>
  )
}
