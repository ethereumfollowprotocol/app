import { Box, Flex, Text } from '@radix-ui/themes'

export function Legend() {
  return (
    <Flex gap='2' className='items-center'>
      <Text weight='medium'>legend:</Text>
      <Box className='flex font-semibold items-center'>
        <Box className='p-2 bg-lime-500 rounded-full'>addition</Box>
      </Box>
      <Box className='flex font-semibold items-center'>
        <Box className='p-2 bg-salmon-400 rounded-full'>deletion</Box>
      </Box>
    </Flex>
  )
}
