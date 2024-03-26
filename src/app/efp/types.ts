export type ListStorageLocation = {
  version: number // 0-255
  locationType: number // 0-255
  data: Uint8Array
}

export interface ListRecord {
  version: number
  recordType: number
  data: Buffer
}

export interface TaggedListRecord extends ListRecord {
  tags: string[]
}

export const DEFAULT_PROFILE_ADDRESS_FOR_TESTING = '0xeb6b293E9bB1d71240953c8306aD2c8aC523516a' //  'dr3a.eth'
