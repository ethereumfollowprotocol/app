/**
 * The list storage location type to encode for storing an efp list within the efp list registry contract
 * https://docs.ethfollow.xyz/design/list-storage-location/
 */
export type ListStorageLocation = {
  version: 1 // 0-255, but currently only supporting 1
  locationType: 1 // 0-255, but currently only supporting 1
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
