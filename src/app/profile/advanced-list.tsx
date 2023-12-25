'use client'

import { Box, Select, Text } from '@radix-ui/themes'

export function AdvancedList() {
  return (
    <Box>
      <Text as='p' className='font-semibold mb-1'>
        Advanced
      </Text>
      <Select.Root>
        <Select.Trigger variant='ghost' title='advanced' className='border-transparent' />
        <Select.Content title='advanced' variant='soft'>
          <Select.Item value='list-storage-location'>List Storage Location</Select.Item>
          <Select.Item value='roles'>Roles</Select.Item>
        </Select.Content>
      </Select.Root>
    </Box>
  )
}
