// @ts-ignore
import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent
  // @ts-ignore
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EFPAccountMetadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const efpAccountMetadataAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'proxy', internalType: 'address', type: 'address' }],
    name: 'addProxy',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'string', type: 'string' }
    ],
    name: 'getValue',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'keys', internalType: 'string[]', type: 'string[]' }
    ],
    name: 'getValues',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'proxy', internalType: 'address', type: 'address' }],
    name: 'isProxy',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'proxy', internalType: 'address', type: 'address' }],
    name: 'removeProxy',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'setValue',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'setValueForAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'records',
        internalType: 'struct IEFPAccountMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' }
        ]
      }
    ],
    name: 'setValues',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      {
        name: 'records',
        internalType: 'struct IEFPAccountMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' }
        ]
      }
    ],
    name: 'setValuesForAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'NewAccountMetadataValue'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'OwnershipTransferred'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proxy',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'ProxyAdded'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proxy',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'ProxyRemoved'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EFPListMinter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const efpListMinterAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_registryAddress', internalType: 'address', type: 'address' },
      {
        name: '_accountMetadataAddress',
        internalType: 'address',
        type: 'address'
      },
      { name: '_listRecordsL1', internalType: 'address', type: 'address' }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'accountMetadata',
    outputs: [
      {
        name: '',
        internalType: 'contract IEFPAccountMetadata',
        type: 'address'
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'listRecordsL1',
    outputs: [{ name: '', internalType: 'contract IEFPListRecords', type: 'address' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }],
    name: 'mintAndSetAsDefaultList',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'mintToAndSetAsDefaultList',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registry',
    outputs: [
      {
        name: '',
        internalType: 'contract IEFPListRegistry_ERC721',
        type: 'address'
      }
    ]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'OwnershipTransferred'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EFPListRecords
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const efpListRecordsAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'op', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'applyListOp',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'ops', internalType: 'bytes[]', type: 'bytes[]' }
    ],
    name: 'applyListOps',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'claimListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'claimListManagerForAddress',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getAllListOps',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOp',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListOpCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'end', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOpsInRange',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListUser',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' }
    ],
    name: 'getMetadataValue',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'keys', internalType: 'string[]', type: 'string[]' }
    ],
    name: 'getMetadataValues',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'listOps',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'setListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' }
    ],
    name: 'setListUser',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'setMetadataValue',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      {
        name: 'records',
        internalType: 'struct IEFPListMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' }
        ]
      }
    ],
    name: 'setMetadataValues',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      { name: 'op', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'ListOp'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'NewListMetadataValue'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'OwnershipTransferred'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EFPListRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const efpListRegistryAbi = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getListStorageLocation',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getMaxMintBatchSize',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getMintState',
    outputs: [
      {
        name: '',
        internalType: 'enum IEFPListRegistry.MintState',
        type: 'uint8'
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getPriceOracle',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' }
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'mintBatch',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mintBatchTo',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'mintTo',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'safeTransferFrom',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'safeTransferFrom',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' }
    ],
    name: 'setApprovalForAll',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'setListStorageLocation',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_maxMintBatchSize', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxMintBatchSize',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_mintState',
        internalType: 'enum IEFPListRegistry.MintState',
        type: 'uint8'
      }
    ],
    name: 'setMintState',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'priceOracle_', internalType: 'address', type: 'address' }],
    name: 'setPriceOracle',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false }
    ],
    name: 'ApprovalForAll'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'ConsecutiveTransfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'listStorageLocation',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      }
    ],
    name: 'ListStorageLocationChange'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'maxMintBatchSize',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'MaxMintBatchSizeChange'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'mintState',
        internalType: 'enum IEFPListRegistry.MintState',
        type: 'uint8',
        indexed: false
      }
    ],
    name: 'MintStateChange'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'OwnershipTransferred'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'priceOracle',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'PriceOracleChange'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'Transfer'
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEFPListRegistry_ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iefpListRegistryErc721Abi = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getListStorageLocation',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getMaxMintBatchSize',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getMintState',
    outputs: [
      {
        name: '',
        internalType: 'enum IEFPListRegistry.MintState',
        type: 'uint8'
      }
    ]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }],
    name: 'mint',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'mintBatch',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mintBatchTo',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'mintTo',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'setListStorageLocation',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_maxMintBatchSize', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxMintBatchSize',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_mintState',
        internalType: 'enum IEFPListRegistry.MintState',
        type: 'uint8'
      }
    ],
    name: 'setMintState',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'listStorageLocation',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false
      }
    ],
    name: 'ListStorageLocationChange'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ListMetadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const listMetadataAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'claimListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'claimListManagerForAddress',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListUser',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' }
    ],
    name: 'getMetadataValue',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'keys', internalType: 'string[]', type: 'string[]' }
    ],
    name: 'getMetadataValues',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'setListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' }
    ],
    name: 'setListUser',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'setMetadataValue',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      {
        name: 'records',
        internalType: 'struct IEFPListMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' }
        ]
      }
    ],
    name: 'setMetadataValues',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'NewListMetadataValue'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ListRecords
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const listRecordsAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'op', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'applyListOp',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'ops', internalType: 'bytes[]', type: 'bytes[]' }
    ],
    name: 'applyListOps',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'claimListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'claimListManagerForAddress',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getAllListOps',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOp',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListOpCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'end', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOpsInRange',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'getListUser',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' }
    ],
    name: 'getMetadataValue',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'keys', internalType: 'string[]', type: 'string[]' }
    ],
    name: 'getMetadataValues',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'listOps',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'setListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' }
    ],
    name: 'setListUser',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'key', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'setMetadataValue',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      {
        name: 'records',
        internalType: 'struct IEFPListMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' }
        ]
      }
    ],
    name: 'setMetadataValues',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      { name: 'op', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'ListOp'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'NewListMetadataValue'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const EfpAccountMetadata_read_undefined = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"getValue"`
 */
export const EfpAccountMetadata_read_GetValue = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'getValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"getValues"`
 */
export const EfpAccountMetadata_read_GetValues = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'getValues'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"isProxy"`
 */
export const EfpAccountMetadata_read_IsProxy = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'isProxy'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"owner"`
 */
export const EfpAccountMetadata_read_Owner = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const EfpAccountMetadata_write_undefined = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"addProxy"`
 */
export const EfpAccountMetadata_write_AddProxy = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'addProxy'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"removeProxy"`
 */
export const EfpAccountMetadata_write_RemoveProxy = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'removeProxy'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpAccountMetadata_write_RenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValue"`
 */
export const EfpAccountMetadata_write_SetValue = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValueForAddress"`
 */
export const EfpAccountMetadata_write_SetValueForAddress = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValueForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValues"`
 */
export const EfpAccountMetadata_write_SetValues = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValues'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValuesForAddress"`
 */
export const EfpAccountMetadata_write_SetValuesForAddress = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValuesForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpAccountMetadata_write_TransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const EfpAccountMetadata_simulate_undefined = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"addProxy"`
 */
export const EfpAccountMetadata_simulate_AddProxy = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'addProxy'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"removeProxy"`
 */
export const EfpAccountMetadata_simulate_RemoveProxy = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'removeProxy'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpAccountMetadata_simulate_RenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValue"`
 */
export const EfpAccountMetadata_simulate_SetValue = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValueForAddress"`
 */
export const EfpAccountMetadata_simulate_SetValueForAddress = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValueForAddress'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValues"`
 */
export const EfpAccountMetadata_simulate_SetValues = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValuesForAddress"`
 */
export const EfpAccountMetadata_simulate_SetValuesForAddress = /*#__PURE__*/ createSimulateContract(
  {
    abi: efpAccountMetadataAbi,
    functionName: 'setValuesForAddress'
  }
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpAccountMetadata_simulate_TransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const EfpAccountMetadata_watch_undefined = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"NewAccountMetadataValue"`
 */
export const EfpAccountMetadata_watch_NewAccountMetadataValue =
  /*#__PURE__*/ createWatchContractEvent({
    abi: efpAccountMetadataAbi,
    functionName: 'NewAccountMetadataValue'
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const EfpAccountMetadata_watch_OwnershipTransferred = /*#__PURE__*/ createWatchContractEvent(
  {
    abi: efpAccountMetadataAbi,
    functionName: 'OwnershipTransferred'
  }
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"ProxyAdded"`
 */
export const EfpAccountMetadata_watch_ProxyAdded = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi,
  functionName: 'ProxyAdded'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"ProxyRemoved"`
 */
export const EfpAccountMetadata_watch_ProxyRemoved = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi,
  functionName: 'ProxyRemoved'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const EfpListMinter_read_undefined = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"accountMetadata"`
 */
export const EfpListMinter_read_AccountMetadata = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'accountMetadata'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"listRecordsL1"`
 */
export const EfpListMinter_read_ListRecordsL1 = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'listRecordsL1'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"owner"`
 */
export const EfpListMinter_read_Owner = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"registry"`
 */
export const EfpListMinter_read_Registry = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'registry'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const EfpListMinter_write_undefined = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"mintAndSetAsDefaultList"`
 */
export const EfpListMinter_write_MintAndSetAsDefaultList = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'mintAndSetAsDefaultList'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"mintToAndSetAsDefaultList"`
 */
export const EfpListMinter_write_MintToAndSetAsDefaultList = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'mintToAndSetAsDefaultList'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpListMinter_write_RenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpListMinter_write_TransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const EfpListMinter_simulate_undefined = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"mintAndSetAsDefaultList"`
 */
export const EfpListMinter_simulate_MintAndSetAsDefaultList = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'mintAndSetAsDefaultList'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"mintToAndSetAsDefaultList"`
 */
export const EfpListMinter_simulate_MintToAndSetAsDefaultList =
  /*#__PURE__*/ createSimulateContract({
    abi: efpListMinterAbi,
    functionName: 'mintToAndSetAsDefaultList'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpListMinter_simulate_RenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpListMinter_simulate_TransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const EfpListMinter_watch_undefined = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const EfpListMinter_watch_OwnershipTransferred = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListMinterAbi,
  functionName: 'OwnershipTransferred'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const EfpListRecords_read_undefined = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getAllListOps"`
 */
export const EfpListRecords_read_GetAllListOps = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getAllListOps'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListManager"`
 */
export const EfpListRecords_read_GetListManager = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOp"`
 */
export const EfpListRecords_read_GetListOp = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOp'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOpCount"`
 */
export const EfpListRecords_read_GetListOpCount = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOpCount'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOpsInRange"`
 */
export const EfpListRecords_read_GetListOpsInRange = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOpsInRange'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListUser"`
 */
export const EfpListRecords_read_GetListUser = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const EfpListRecords_read_GetMetadataValue = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const EfpListRecords_read_GetMetadataValues = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"listOps"`
 */
export const EfpListRecords_read_ListOps = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'listOps'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"owner"`
 */
export const EfpListRecords_read_Owner = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const EfpListRecords_write_undefined = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const EfpListRecords_write_ApplyListOp = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const EfpListRecords_write_ApplyListOps = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const EfpListRecords_write_ClaimListManager = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const EfpListRecords_write_ClaimListManagerForAddress = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpListRecords_write_RenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const EfpListRecords_write_SetListManager = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const EfpListRecords_write_SetListUser = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const EfpListRecords_write_SetMetadataValue = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const EfpListRecords_write_SetMetadataValues = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpListRecords_write_TransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const EfpListRecords_simulate_undefined = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const EfpListRecords_simulate_ApplyListOp = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const EfpListRecords_simulate_ApplyListOps = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const EfpListRecords_simulate_ClaimListManager = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const EfpListRecords_simulate_ClaimListManagerForAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: efpListRecordsAbi,
    functionName: 'claimListManagerForAddress'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpListRecords_simulate_RenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const EfpListRecords_simulate_SetListManager = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const EfpListRecords_simulate_SetListUser = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const EfpListRecords_simulate_SetMetadataValue = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const EfpListRecords_simulate_SetMetadataValues = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpListRecords_simulate_TransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const EfpListRecords_watch_undefined = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"ListOp"`
 */
export const EfpListRecords_watch_ListOp = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  functionName: 'ListOp'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"NewListMetadataValue"`
 */
export const EfpListRecords_watch_NewListMetadataValue = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  functionName: 'NewListMetadataValue'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const EfpListRecords_watch_OwnershipTransferred = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  functionName: 'OwnershipTransferred'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const EfpListRegistry_read_undefined = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"balanceOf"`
 */
export const EfpListRegistry_read_BalanceOf = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getApproved"`
 */
export const EfpListRegistry_read_GetApproved = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getApproved'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getListStorageLocation"`
 */
export const EfpListRegistry_read_GetListStorageLocation = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getListStorageLocation'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getMaxMintBatchSize"`
 */
export const EfpListRegistry_read_GetMaxMintBatchSize = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getMaxMintBatchSize'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getMintState"`
 */
export const EfpListRegistry_read_GetMintState = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getMintState'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getPriceOracle"`
 */
export const EfpListRegistry_read_GetPriceOracle = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getPriceOracle'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const EfpListRegistry_read_IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'isApprovedForAll'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"name"`
 */
export const EfpListRegistry_read_Name = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"owner"`
 */
export const EfpListRegistry_read_Owner = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"ownerOf"`
 */
export const EfpListRegistry_read_OwnerOf = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'ownerOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const EfpListRegistry_read_SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"symbol"`
 */
export const EfpListRegistry_read_Symbol = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"tokenURI"`
 */
export const EfpListRegistry_read_TokenUri = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'tokenURI'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"totalSupply"`
 */
export const EfpListRegistry_read_TotalSupply = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const EfpListRegistry_write_undefined = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"approve"`
 */
export const EfpListRegistry_write_Approve = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mint"`
 */
export const EfpListRegistry_write_Mint = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const EfpListRegistry_write_MintBatch = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatchTo"`
 */
export const EfpListRegistry_write_MintBatchTo = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintTo"`
 */
export const EfpListRegistry_write_MintTo = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpListRegistry_write_RenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const EfpListRegistry_write_SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'safeTransferFrom'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const EfpListRegistry_write_SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setApprovalForAll'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const EfpListRegistry_write_SetListStorageLocation = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setListStorageLocation'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const EfpListRegistry_write_SetMaxMintBatchSize = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setMaxMintBatchSize'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMintState"`
 */
export const EfpListRegistry_write_SetMintState = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setPriceOracle"`
 */
export const EfpListRegistry_write_SetPriceOracle = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setPriceOracle'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const EfpListRegistry_write_TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpListRegistry_write_TransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const EfpListRegistry_simulate_undefined = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"approve"`
 */
export const EfpListRegistry_simulate_Approve = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mint"`
 */
export const EfpListRegistry_simulate_Mint = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const EfpListRegistry_simulate_MintBatch = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatchTo"`
 */
export const EfpListRegistry_simulate_MintBatchTo = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintTo"`
 */
export const EfpListRegistry_simulate_MintTo = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const EfpListRegistry_simulate_RenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const EfpListRegistry_simulate_SafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'safeTransferFrom'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const EfpListRegistry_simulate_SetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setApprovalForAll'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const EfpListRegistry_simulate_SetListStorageLocation = /*#__PURE__*/ createSimulateContract(
  {
    abi: efpListRegistryAbi,
    functionName: 'setListStorageLocation'
  }
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const EfpListRegistry_simulate_SetMaxMintBatchSize = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setMaxMintBatchSize'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMintState"`
 */
export const EfpListRegistry_simulate_SetMintState = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setPriceOracle"`
 */
export const EfpListRegistry_simulate_SetPriceOracle = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setPriceOracle'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const EfpListRegistry_simulate_TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const EfpListRegistry_simulate_TransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const EfpListRegistry_watch_undefined = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Approval"`
 */
export const EfpListRegistry_watch_Approval = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'Approval'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const EfpListRegistry_watch_ApprovalForAll = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'ApprovalForAll'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 */
export const EfpListRegistry_watch_ConsecutiveTransfer = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'ConsecutiveTransfer'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"ListStorageLocationChange"`
 */
export const EfpListRegistry_watch_ListStorageLocationChange =
  /*#__PURE__*/ createWatchContractEvent({
    abi: efpListRegistryAbi,
    functionName: 'ListStorageLocationChange'
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"MaxMintBatchSizeChange"`
 */
export const EfpListRegistry_watch_MaxMintBatchSizeChange = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'MaxMintBatchSizeChange'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"MintStateChange"`
 */
export const EfpListRegistry_watch_MintStateChange = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'MintStateChange'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const EfpListRegistry_watch_OwnershipTransferred = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'OwnershipTransferred'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"PriceOracleChange"`
 */
export const EfpListRegistry_watch_PriceOracleChange = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'PriceOracleChange'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Transfer"`
 */
export const EfpListRegistry_watch_Transfer = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  functionName: 'Transfer'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const IefpListRegistryErc721_read_undefined = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getListStorageLocation"`
 */
export const IefpListRegistryErc721_read_GetListStorageLocation = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'getListStorageLocation'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getMaxMintBatchSize"`
 */
export const IefpListRegistryErc721_read_GetMaxMintBatchSize = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'getMaxMintBatchSize'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getMintState"`
 */
export const IefpListRegistryErc721_read_GetMintState = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'getMintState'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const IefpListRegistryErc721_read_OwnerOf = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'ownerOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"totalSupply"`
 */
export const IefpListRegistryErc721_read_TotalSupply = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const IefpListRegistryErc721_write_undefined = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mint"`
 */
export const IefpListRegistryErc721_write_Mint = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mint'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatch"`
 */
export const IefpListRegistryErc721_write_MintBatch = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatchTo"`
 */
export const IefpListRegistryErc721_write_MintBatchTo = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintTo"`
 */
export const IefpListRegistryErc721_write_MintTo = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const IefpListRegistryErc721_write_SetListStorageLocation =
  /*#__PURE__*/ createWriteContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setListStorageLocation'
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const IefpListRegistryErc721_write_SetMaxMintBatchSize = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setMaxMintBatchSize'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMintState"`
 */
export const IefpListRegistryErc721_write_SetMintState = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const IefpListRegistryErc721_simulate_undefined = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mint"`
 */
export const IefpListRegistryErc721_simulate_Mint = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mint'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatch"`
 */
export const IefpListRegistryErc721_simulate_MintBatch = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatchTo"`
 */
export const IefpListRegistryErc721_simulate_MintBatchTo = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintTo"`
 */
export const IefpListRegistryErc721_simulate_MintTo = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const IefpListRegistryErc721_simulate_SetListStorageLocation =
  /*#__PURE__*/ createSimulateContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setListStorageLocation'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const IefpListRegistryErc721_simulate_SetMaxMintBatchSize =
  /*#__PURE__*/ createSimulateContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setMaxMintBatchSize'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMintState"`
 */
export const IefpListRegistryErc721_simulate_SetMintState = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const IefpListRegistryErc721_watch_undefined = /*#__PURE__*/ createWatchContractEvent({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `eventName` set to `"ListStorageLocationChange"`
 */
export const IefpListRegistryErc721_watch_ListStorageLocationChange =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iefpListRegistryErc721Abi,
    functionName: 'ListStorageLocationChange'
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const ListMetadata_read_undefined = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getListManager"`
 */
export const ListMetadata_read_GetListManager = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getListUser"`
 */
export const ListMetadata_read_GetListUser = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const ListMetadata_read_GetMetadataValue = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const ListMetadata_read_GetMetadataValues = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const ListMetadata_write_undefined = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManager"`
 */
export const ListMetadata_write_ClaimListManager = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const ListMetadata_write_ClaimListManagerForAddress = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListManager"`
 */
export const ListMetadata_write_SetListManager = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListUser"`
 */
export const ListMetadata_write_SetListUser = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const ListMetadata_write_SetMetadataValue = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const ListMetadata_write_SetMetadataValues = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const ListMetadata_simulate_undefined = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManager"`
 */
export const ListMetadata_simulate_ClaimListManager = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const ListMetadata_simulate_ClaimListManagerForAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: listMetadataAbi,
    functionName: 'claimListManagerForAddress'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListManager"`
 */
export const ListMetadata_simulate_SetListManager = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListUser"`
 */
export const ListMetadata_simulate_SetListUser = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const ListMetadata_simulate_SetMetadataValue = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const ListMetadata_simulate_SetMetadataValues = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const ListMetadata_watch_undefined = /*#__PURE__*/ createWatchContractEvent({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"NewListMetadataValue"`
 */
export const ListMetadata_watch_NewListMetadataValue = /*#__PURE__*/ createWatchContractEvent({
  abi: listMetadataAbi,
  functionName: 'NewListMetadataValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const ListRecords_read_undefined = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getAllListOps"`
 */
export const ListRecords_read_GetAllListOps = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getAllListOps'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListManager"`
 */
export const ListRecords_read_GetListManager = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOp"`
 */
export const ListRecords_read_GetListOp = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOp'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOpCount"`
 */
export const ListRecords_read_GetListOpCount = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOpCount'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOpsInRange"`
 */
export const ListRecords_read_GetListOpsInRange = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOpsInRange'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListUser"`
 */
export const ListRecords_read_GetListUser = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const ListRecords_read_GetMetadataValue = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const ListRecords_read_GetMetadataValues = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"listOps"`
 */
export const ListRecords_read_ListOps = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'listOps'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const ListRecords_write_undefined = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const ListRecords_write_ApplyListOp = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const ListRecords_write_ApplyListOps = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const ListRecords_write_ClaimListManager = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const ListRecords_write_ClaimListManagerForAddress = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const ListRecords_write_SetListManager = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const ListRecords_write_SetListUser = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const ListRecords_write_SetMetadataValue = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const ListRecords_write_SetMetadataValues = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const ListRecords_simulate_undefined = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const ListRecords_simulate_ApplyListOp = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const ListRecords_simulate_ApplyListOps = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const ListRecords_simulate_ClaimListManager = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const ListRecords_simulate_ClaimListManagerForAddress = /*#__PURE__*/ createSimulateContract(
  {
    abi: listRecordsAbi,
    functionName: 'claimListManagerForAddress'
  }
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const ListRecords_simulate_SetListManager = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const ListRecords_simulate_SetListUser = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const ListRecords_simulate_SetMetadataValue = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const ListRecords_simulate_SetMetadataValues = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const ListRecords_watch_undefined = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"ListOp"`
 */
export const ListRecords_watch_ListOp = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi,
  functionName: 'ListOp'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"NewListMetadataValue"`
 */
export const ListRecords_watch_NewListMetadataValue = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi,
  functionName: 'NewListMetadataValue'
})
