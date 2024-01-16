import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'claimant', internalType: 'address', type: 'address' }
    ],
    name: 'claimReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
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
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
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
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' }
    ],
    name: 'setReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
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
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
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
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'UpdateAccountMetadata'
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'claimant', internalType: 'address', type: 'address' }
    ],
    name: 'claimReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }],
    name: 'easyMint',
    outputs: []
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'listStorageLocation', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'easyMintTo',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'listRecordsL1',
    outputs: [{ name: '', internalType: 'contract IEFPListRecords', type: 'address' }]
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
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
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
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' }
    ],
    name: 'setReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
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
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'op', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'applyListOp',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'ops', internalType: 'bytes[]', type: 'bytes[]' }
    ],
    name: 'applyListOps',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'claimListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'claimListManagerForAddress',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'claimant', internalType: 'address', type: 'address' }
    ],
    name: 'claimReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'getAllListOps',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'getListManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOp',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'getListOpCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'end', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOpsInRange',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
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
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'setListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' }
    ],
    name: 'setListUser',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
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
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      {
        name: 'records',
        internalType: 'struct IEFPListMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' }
        ]
      },
      { name: 'ops', internalType: 'bytes[]', type: 'bytes[]' }
    ],
    name: 'setMetadataValuesAndApplyListOps',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' }
    ],
    name: 'setReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'op', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'ListOp'
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
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'UpdateListMetadata'
  },
  {
    type: 'error',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'SlotAlreadyClaimed'
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'claimant', internalType: 'address', type: 'address' }
    ],
    name: 'claimReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'explicitOwnershipOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' }
        ]
      }
    ]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'explicitOwnershipsOf',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' }
        ]
      }
    ]
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
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'ens', internalType: 'contract ENS', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' }
    ],
    name: 'setReverseENS',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }]
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
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'stop', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'tokensOfOwnerIn',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }]
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
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
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
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
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
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
    name: 'UpdateListStorageLocation'
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'InvalidQueryRange' },
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
    name: 'UpdateListStorageLocation'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ListMetadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const listMetadataAbi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'claimListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'claimListManagerForAddress',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'getListManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'setListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' }
    ],
    name: 'setListUser',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
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
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'UpdateListMetadata'
  },
  {
    type: 'error',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'SlotAlreadyClaimed'
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'op', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'applyListOp',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'ops', internalType: 'bytes[]', type: 'bytes[]' }
    ],
    name: 'applyListOps',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'claimListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'claimListManagerForAddress',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'getAllListOps',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'getListManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'index', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOp',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
    name: 'getListOpCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'start', internalType: 'uint256', type: 'uint256' },
      { name: 'end', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'getListOpsInRange',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }]
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'uint256', type: 'uint256' }],
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
    name: 'pause',
    outputs: []
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }]
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'setListManager',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' }
    ],
    name: 'setListUser',
    outputs: []
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
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
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
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
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      {
        name: 'records',
        internalType: 'struct IEFPListMetadata.KeyValue[]',
        type: 'tuple[]',
        components: [
          { name: 'key', internalType: 'string', type: 'string' },
          { name: 'value', internalType: 'bytes', type: 'bytes' }
        ]
      },
      { name: 'ops', internalType: 'bytes[]', type: 'bytes[]' }
    ],
    name: 'setMetadataValuesAndApplyListOps',
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: []
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'op', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'ListOp'
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
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Paused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'Unpaused'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'UpdateListMetadata'
  },
  {
    type: 'error',
    inputs: [
      { name: 'slot', internalType: 'uint256', type: 'uint256' },
      { name: 'manager', internalType: 'address', type: 'address' }
    ],
    name: 'SlotAlreadyClaimed'
  }
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const readEfpAccountMetadata = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"getValue"`
 */
export const readEfpAccountMetadataGetValue = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'getValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"getValues"`
 */
export const readEfpAccountMetadataGetValues = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'getValues'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"isProxy"`
 */
export const readEfpAccountMetadataIsProxy = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'isProxy'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"owner"`
 */
export const readEfpAccountMetadataOwner = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"paused"`
 */
export const readEfpAccountMetadataPaused = /*#__PURE__*/ createReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const writeEfpAccountMetadata = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"addProxy"`
 */
export const writeEfpAccountMetadataAddProxy = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'addProxy'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const writeEfpAccountMetadataClaimReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const writeEfpAccountMetadataPause = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"removeProxy"`
 */
export const writeEfpAccountMetadataRemoveProxy = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'removeProxy'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeEfpAccountMetadataRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const writeEfpAccountMetadataSetReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValue"`
 */
export const writeEfpAccountMetadataSetValue = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValueForAddress"`
 */
export const writeEfpAccountMetadataSetValueForAddress = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValueForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValues"`
 */
export const writeEfpAccountMetadataSetValues = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValues'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValuesForAddress"`
 */
export const writeEfpAccountMetadataSetValuesForAddress = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValuesForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeEfpAccountMetadataTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const writeEfpAccountMetadataUnpause = /*#__PURE__*/ createWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const simulateEfpAccountMetadata = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"addProxy"`
 */
export const simulateEfpAccountMetadataAddProxy = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'addProxy'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const simulateEfpAccountMetadataClaimReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const simulateEfpAccountMetadataPause = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"removeProxy"`
 */
export const simulateEfpAccountMetadataRemoveProxy = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'removeProxy'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateEfpAccountMetadataRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const simulateEfpAccountMetadataSetReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValue"`
 */
export const simulateEfpAccountMetadataSetValue = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValueForAddress"`
 */
export const simulateEfpAccountMetadataSetValueForAddress = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValueForAddress'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValues"`
 */
export const simulateEfpAccountMetadataSetValues = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValuesForAddress"`
 */
export const simulateEfpAccountMetadataSetValuesForAddress = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValuesForAddress'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateEfpAccountMetadataTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateEfpAccountMetadataUnpause = /*#__PURE__*/ createSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const watchEfpAccountMetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchEfpAccountMetadataOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: efpAccountMetadataAbi,
    eventName: 'OwnershipTransferred'
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"Paused"`
 */
export const watchEfpAccountMetadataPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"ProxyAdded"`
 */
export const watchEfpAccountMetadataProxyAddedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi,
  eventName: 'ProxyAdded'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"ProxyRemoved"`
 */
export const watchEfpAccountMetadataProxyRemovedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi,
  eventName: 'ProxyRemoved'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchEfpAccountMetadataUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpAccountMetadataAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"UpdateAccountMetadata"`
 */
export const watchEfpAccountMetadataUpdateAccountMetadataEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: efpAccountMetadataAbi,
    eventName: 'UpdateAccountMetadata'
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const readEfpListMinter = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"accountMetadata"`
 */
export const readEfpListMinterAccountMetadata = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'accountMetadata'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"listRecordsL1"`
 */
export const readEfpListMinterListRecordsL1 = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'listRecordsL1'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"owner"`
 */
export const readEfpListMinterOwner = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"paused"`
 */
export const readEfpListMinterPaused = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"registry"`
 */
export const readEfpListMinterRegistry = /*#__PURE__*/ createReadContract({
  abi: efpListMinterAbi,
  functionName: 'registry'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const writeEfpListMinter = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const writeEfpListMinterClaimReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMint"`
 */
export const writeEfpListMinterEasyMint = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'easyMint'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMintTo"`
 */
export const writeEfpListMinterEasyMintTo = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'easyMintTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"pause"`
 */
export const writeEfpListMinterPause = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeEfpListMinterRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const writeEfpListMinterSetReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeEfpListMinterTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"unpause"`
 */
export const writeEfpListMinterUnpause = /*#__PURE__*/ createWriteContract({
  abi: efpListMinterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const simulateEfpListMinter = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const simulateEfpListMinterClaimReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMint"`
 */
export const simulateEfpListMinterEasyMint = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'easyMint'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMintTo"`
 */
export const simulateEfpListMinterEasyMintTo = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'easyMintTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"pause"`
 */
export const simulateEfpListMinterPause = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateEfpListMinterRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const simulateEfpListMinterSetReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateEfpListMinterTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateEfpListMinterUnpause = /*#__PURE__*/ createSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const watchEfpListMinterEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchEfpListMinterOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListMinterAbi,
  eventName: 'OwnershipTransferred'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__ and `eventName` set to `"Paused"`
 */
export const watchEfpListMinterPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListMinterAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchEfpListMinterUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListMinterAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const readEfpListRecords = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getAllListOps"`
 */
export const readEfpListRecordsGetAllListOps = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getAllListOps'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListManager"`
 */
export const readEfpListRecordsGetListManager = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOp"`
 */
export const readEfpListRecordsGetListOp = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOp'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOpCount"`
 */
export const readEfpListRecordsGetListOpCount = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOpCount'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOpsInRange"`
 */
export const readEfpListRecordsGetListOpsInRange = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOpsInRange'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListUser"`
 */
export const readEfpListRecordsGetListUser = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const readEfpListRecordsGetMetadataValue = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const readEfpListRecordsGetMetadataValues = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"listOps"`
 */
export const readEfpListRecordsListOps = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'listOps'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"owner"`
 */
export const readEfpListRecordsOwner = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"paused"`
 */
export const readEfpListRecordsPaused = /*#__PURE__*/ createReadContract({
  abi: efpListRecordsAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const writeEfpListRecords = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const writeEfpListRecordsApplyListOp = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const writeEfpListRecordsApplyListOps = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const writeEfpListRecordsClaimListManager = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const writeEfpListRecordsClaimListManagerForAddress = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const writeEfpListRecordsClaimReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const writeEfpListRecordsPause = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeEfpListRecordsRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const writeEfpListRecordsSetListManager = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const writeEfpListRecordsSetListUser = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const writeEfpListRecordsSetMetadataValue = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const writeEfpListRecordsSetMetadataValues = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const writeEfpListRecordsSetMetadataValuesAndApplyListOps =
  /*#__PURE__*/ createWriteContract({
    abi: efpListRecordsAbi,
    functionName: 'setMetadataValuesAndApplyListOps'
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const writeEfpListRecordsSetReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeEfpListRecordsTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const writeEfpListRecordsUnpause = /*#__PURE__*/ createWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const simulateEfpListRecords = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const simulateEfpListRecordsApplyListOp = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const simulateEfpListRecordsApplyListOps = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const simulateEfpListRecordsClaimListManager = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const simulateEfpListRecordsClaimListManagerForAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: efpListRecordsAbi,
    functionName: 'claimListManagerForAddress'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const simulateEfpListRecordsClaimReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const simulateEfpListRecordsPause = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateEfpListRecordsRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const simulateEfpListRecordsSetListManager = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const simulateEfpListRecordsSetListUser = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const simulateEfpListRecordsSetMetadataValue = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const simulateEfpListRecordsSetMetadataValues = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const simulateEfpListRecordsSetMetadataValuesAndApplyListOps =
  /*#__PURE__*/ createSimulateContract({
    abi: efpListRecordsAbi,
    functionName: 'setMetadataValuesAndApplyListOps'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const simulateEfpListRecordsSetReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateEfpListRecordsTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateEfpListRecordsUnpause = /*#__PURE__*/ createSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const watchEfpListRecordsEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"ListOp"`
 */
export const watchEfpListRecordsListOpEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'ListOp'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchEfpListRecordsOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'OwnershipTransferred'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"Paused"`
 */
export const watchEfpListRecordsPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchEfpListRecordsUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"UpdateListMetadata"`
 */
export const watchEfpListRecordsUpdateListMetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'UpdateListMetadata'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const readEfpListRegistry = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readEfpListRegistryBalanceOf = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"explicitOwnershipOf"`
 */
export const readEfpListRegistryExplicitOwnershipOf = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'explicitOwnershipOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"explicitOwnershipsOf"`
 */
export const readEfpListRegistryExplicitOwnershipsOf = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'explicitOwnershipsOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getApproved"`
 */
export const readEfpListRegistryGetApproved = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getApproved'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getListStorageLocation"`
 */
export const readEfpListRegistryGetListStorageLocation = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getListStorageLocation'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getMaxMintBatchSize"`
 */
export const readEfpListRegistryGetMaxMintBatchSize = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getMaxMintBatchSize'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getMintState"`
 */
export const readEfpListRegistryGetMintState = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getMintState'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getPriceOracle"`
 */
export const readEfpListRegistryGetPriceOracle = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getPriceOracle'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readEfpListRegistryIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'isApprovedForAll'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"name"`
 */
export const readEfpListRegistryName = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"owner"`
 */
export const readEfpListRegistryOwner = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readEfpListRegistryOwnerOf = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'ownerOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"paused"`
 */
export const readEfpListRegistryPaused = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readEfpListRegistrySupportsInterface = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"symbol"`
 */
export const readEfpListRegistrySymbol = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readEfpListRegistryTokenUri = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'tokenURI'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"tokensOfOwner"`
 */
export const readEfpListRegistryTokensOfOwner = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'tokensOfOwner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"tokensOfOwnerIn"`
 */
export const readEfpListRegistryTokensOfOwnerIn = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'tokensOfOwnerIn'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readEfpListRegistryTotalSupply = /*#__PURE__*/ createReadContract({
  abi: efpListRegistryAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const writeEfpListRegistry = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"approve"`
 */
export const writeEfpListRegistryApprove = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const writeEfpListRegistryClaimReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mint"`
 */
export const writeEfpListRegistryMint = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const writeEfpListRegistryMintBatch = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatchTo"`
 */
export const writeEfpListRegistryMintBatchTo = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintTo"`
 */
export const writeEfpListRegistryMintTo = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"pause"`
 */
export const writeEfpListRegistryPause = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeEfpListRegistryRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeEfpListRegistrySafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'safeTransferFrom'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeEfpListRegistrySetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setApprovalForAll'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const writeEfpListRegistrySetListStorageLocation = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setListStorageLocation'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const writeEfpListRegistrySetMaxMintBatchSize = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setMaxMintBatchSize'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMintState"`
 */
export const writeEfpListRegistrySetMintState = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setPriceOracle"`
 */
export const writeEfpListRegistrySetPriceOracle = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setPriceOracle'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const writeEfpListRegistrySetReverseEns = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeEfpListRegistryTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeEfpListRegistryTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"unpause"`
 */
export const writeEfpListRegistryUnpause = /*#__PURE__*/ createWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const simulateEfpListRegistry = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"approve"`
 */
export const simulateEfpListRegistryApprove = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const simulateEfpListRegistryClaimReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mint"`
 */
export const simulateEfpListRegistryMint = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const simulateEfpListRegistryMintBatch = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatchTo"`
 */
export const simulateEfpListRegistryMintBatchTo = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintTo"`
 */
export const simulateEfpListRegistryMintTo = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"pause"`
 */
export const simulateEfpListRegistryPause = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateEfpListRegistryRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateEfpListRegistrySafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'safeTransferFrom'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateEfpListRegistrySetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setApprovalForAll'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const simulateEfpListRegistrySetListStorageLocation = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setListStorageLocation'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const simulateEfpListRegistrySetMaxMintBatchSize = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setMaxMintBatchSize'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMintState"`
 */
export const simulateEfpListRegistrySetMintState = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setPriceOracle"`
 */
export const simulateEfpListRegistrySetPriceOracle = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setPriceOracle'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const simulateEfpListRegistrySetReverseEns = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateEfpListRegistryTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateEfpListRegistryTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateEfpListRegistryUnpause = /*#__PURE__*/ createSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const watchEfpListRegistryEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Approval"`
 */
export const watchEfpListRegistryApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchEfpListRegistryApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'ApprovalForAll'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 */
export const watchEfpListRegistryConsecutiveTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'ConsecutiveTransfer'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"MaxMintBatchSizeChange"`
 */
export const watchEfpListRegistryMaxMintBatchSizeChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'MaxMintBatchSizeChange'
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"MintStateChange"`
 */
export const watchEfpListRegistryMintStateChangeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'MintStateChange'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchEfpListRegistryOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent(
  {
    abi: efpListRegistryAbi,
    eventName: 'OwnershipTransferred'
  }
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Paused"`
 */
export const watchEfpListRegistryPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"PriceOracleChange"`
 */
export const watchEfpListRegistryPriceOracleChangeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'PriceOracleChange'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchEfpListRegistryTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchEfpListRegistryUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"UpdateListStorageLocation"`
 */
export const watchEfpListRegistryUpdateListStorageLocationEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'UpdateListStorageLocation'
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const readIefpListRegistryErc721 = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getListStorageLocation"`
 */
export const readIefpListRegistryErc721GetListStorageLocation = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'getListStorageLocation'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getMaxMintBatchSize"`
 */
export const readIefpListRegistryErc721GetMaxMintBatchSize = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'getMaxMintBatchSize'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getMintState"`
 */
export const readIefpListRegistryErc721GetMintState = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'getMintState'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const readIefpListRegistryErc721OwnerOf = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'ownerOf'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readIefpListRegistryErc721TotalSupply = /*#__PURE__*/ createReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const writeIefpListRegistryErc721 = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mint"`
 */
export const writeIefpListRegistryErc721Mint = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mint'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatch"`
 */
export const writeIefpListRegistryErc721MintBatch = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatchTo"`
 */
export const writeIefpListRegistryErc721MintBatchTo = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintTo"`
 */
export const writeIefpListRegistryErc721MintTo = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const writeIefpListRegistryErc721SetListStorageLocation = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setListStorageLocation'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const writeIefpListRegistryErc721SetMaxMintBatchSize = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setMaxMintBatchSize'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMintState"`
 */
export const writeIefpListRegistryErc721SetMintState = /*#__PURE__*/ createWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const simulateIefpListRegistryErc721 = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mint"`
 */
export const simulateIefpListRegistryErc721Mint = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mint'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatch"`
 */
export const simulateIefpListRegistryErc721MintBatch = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatchTo"`
 */
export const simulateIefpListRegistryErc721MintBatchTo = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintTo"`
 */
export const simulateIefpListRegistryErc721MintTo = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const simulateIefpListRegistryErc721SetListStorageLocation =
  /*#__PURE__*/ createSimulateContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setListStorageLocation'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const simulateIefpListRegistryErc721SetMaxMintBatchSize =
  /*#__PURE__*/ createSimulateContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setMaxMintBatchSize'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMintState"`
 */
export const simulateIefpListRegistryErc721SetMintState = /*#__PURE__*/ createSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const watchIefpListRegistryErc721Event = /*#__PURE__*/ createWatchContractEvent({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `eventName` set to `"UpdateListStorageLocation"`
 */
export const watchIefpListRegistryErc721UpdateListStorageLocationEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iefpListRegistryErc721Abi,
    eventName: 'UpdateListStorageLocation'
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const readListMetadata = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getListManager"`
 */
export const readListMetadataGetListManager = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getListUser"`
 */
export const readListMetadataGetListUser = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const readListMetadataGetMetadataValue = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const readListMetadataGetMetadataValues = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"owner"`
 */
export const readListMetadataOwner = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"paused"`
 */
export const readListMetadataPaused = /*#__PURE__*/ createReadContract({
  abi: listMetadataAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const writeListMetadata = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManager"`
 */
export const writeListMetadataClaimListManager = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const writeListMetadataClaimListManagerForAddress = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const writeListMetadataPause = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeListMetadataRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListManager"`
 */
export const writeListMetadataSetListManager = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListUser"`
 */
export const writeListMetadataSetListUser = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const writeListMetadataSetMetadataValue = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const writeListMetadataSetMetadataValues = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeListMetadataTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const writeListMetadataUnpause = /*#__PURE__*/ createWriteContract({
  abi: listMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const simulateListMetadata = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManager"`
 */
export const simulateListMetadataClaimListManager = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const simulateListMetadataClaimListManagerForAddress = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const simulateListMetadataPause = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateListMetadataRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListManager"`
 */
export const simulateListMetadataSetListManager = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListUser"`
 */
export const simulateListMetadataSetListUser = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const simulateListMetadataSetMetadataValue = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const simulateListMetadataSetMetadataValues = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateListMetadataTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateListMetadataUnpause = /*#__PURE__*/ createSimulateContract({
  abi: listMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const watchListMetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchListMetadataOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listMetadataAbi,
  eventName: 'OwnershipTransferred'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"Paused"`
 */
export const watchListMetadataPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listMetadataAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchListMetadataUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listMetadataAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"UpdateListMetadata"`
 */
export const watchListMetadataUpdateListMetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listMetadataAbi,
  eventName: 'UpdateListMetadata'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const readListRecords = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getAllListOps"`
 */
export const readListRecordsGetAllListOps = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getAllListOps'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListManager"`
 */
export const readListRecordsGetListManager = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOp"`
 */
export const readListRecordsGetListOp = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOp'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOpCount"`
 */
export const readListRecordsGetListOpCount = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOpCount'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOpsInRange"`
 */
export const readListRecordsGetListOpsInRange = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOpsInRange'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListUser"`
 */
export const readListRecordsGetListUser = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const readListRecordsGetMetadataValue = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const readListRecordsGetMetadataValues = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"listOps"`
 */
export const readListRecordsListOps = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'listOps'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"owner"`
 */
export const readListRecordsOwner = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"paused"`
 */
export const readListRecordsPaused = /*#__PURE__*/ createReadContract({
  abi: listRecordsAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const writeListRecords = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const writeListRecordsApplyListOp = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const writeListRecordsApplyListOps = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const writeListRecordsClaimListManager = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const writeListRecordsClaimListManagerForAddress = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const writeListRecordsPause = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeListRecordsRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const writeListRecordsSetListManager = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const writeListRecordsSetListUser = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const writeListRecordsSetMetadataValue = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const writeListRecordsSetMetadataValues = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const writeListRecordsSetMetadataValuesAndApplyListOps = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValuesAndApplyListOps'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeListRecordsTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const writeListRecordsUnpause = /*#__PURE__*/ createWriteContract({
  abi: listRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const simulateListRecords = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const simulateListRecordsApplyListOp = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const simulateListRecordsApplyListOps = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const simulateListRecordsClaimListManager = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const simulateListRecordsClaimListManagerForAddress = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const simulateListRecordsPause = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateListRecordsRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const simulateListRecordsSetListManager = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const simulateListRecordsSetListUser = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const simulateListRecordsSetMetadataValue = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const simulateListRecordsSetMetadataValues = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const simulateListRecordsSetMetadataValuesAndApplyListOps =
  /*#__PURE__*/ createSimulateContract({
    abi: listRecordsAbi,
    functionName: 'setMetadataValuesAndApplyListOps'
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateListRecordsTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateListRecordsUnpause = /*#__PURE__*/ createSimulateContract({
  abi: listRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const watchListRecordsEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"ListOp"`
 */
export const watchListRecordsListOpEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'ListOp'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchListRecordsOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'OwnershipTransferred'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"Paused"`
 */
export const watchListRecordsPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchListRecordsUnpausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"UpdateListMetadata"`
 */
export const watchListRecordsUpdateListMetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'UpdateListMetadata'
})
