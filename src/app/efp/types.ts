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

export const DEFAULT_PROFILE_FOR_TESTING = 'dr3a.eth'
