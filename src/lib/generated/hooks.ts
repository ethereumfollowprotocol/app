import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent
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
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const useReadEfpAccountMetadata = /*#__PURE__*/ createUseReadContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"getValue"`
 */
export const useReadEfpAccountMetadataGetValue = /*#__PURE__*/ createUseReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'getValue'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"getValues"`
 */
export const useReadEfpAccountMetadataGetValues = /*#__PURE__*/ createUseReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'getValues'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"isProxy"`
 */
export const useReadEfpAccountMetadataIsProxy = /*#__PURE__*/ createUseReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'isProxy'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"owner"`
 */
export const useReadEfpAccountMetadataOwner = /*#__PURE__*/ createUseReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"paused"`
 */
export const useReadEfpAccountMetadataPaused = /*#__PURE__*/ createUseReadContract({
  abi: efpAccountMetadataAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const useWriteEfpAccountMetadata = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"addProxy"`
 */
export const useWriteEfpAccountMetadataAddProxy = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'addProxy'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useWriteEfpAccountMetadataClaimReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteEfpAccountMetadataPause = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"removeProxy"`
 */
export const useWriteEfpAccountMetadataRemoveProxy = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'removeProxy'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteEfpAccountMetadataRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useWriteEfpAccountMetadataSetReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValue"`
 */
export const useWriteEfpAccountMetadataSetValue = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValue'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValueForAddress"`
 */
export const useWriteEfpAccountMetadataSetValueForAddress = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValueForAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValues"`
 */
export const useWriteEfpAccountMetadataSetValues = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValues'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValuesForAddress"`
 */
export const useWriteEfpAccountMetadataSetValuesForAddress = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValuesForAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteEfpAccountMetadataTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteEfpAccountMetadataUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: efpAccountMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const useSimulateEfpAccountMetadata = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"addProxy"`
 */
export const useSimulateEfpAccountMetadataAddProxy = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'addProxy'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useSimulateEfpAccountMetadataClaimReverseEns = /*#__PURE__*/ createUseSimulateContract(
  {
    abi: efpAccountMetadataAbi,
    functionName: 'claimReverseENS'
  }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateEfpAccountMetadataPause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"removeProxy"`
 */
export const useSimulateEfpAccountMetadataRemoveProxy = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'removeProxy'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateEfpAccountMetadataRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpAccountMetadataAbi,
    functionName: 'renounceOwnership'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useSimulateEfpAccountMetadataSetReverseEns = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValue"`
 */
export const useSimulateEfpAccountMetadataSetValue = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValue'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValueForAddress"`
 */
export const useSimulateEfpAccountMetadataSetValueForAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpAccountMetadataAbi,
    functionName: 'setValueForAddress'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValues"`
 */
export const useSimulateEfpAccountMetadataSetValues = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'setValues'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"setValuesForAddress"`
 */
export const useSimulateEfpAccountMetadataSetValuesForAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpAccountMetadataAbi,
    functionName: 'setValuesForAddress'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateEfpAccountMetadataTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpAccountMetadataAbi,
    functionName: 'transferOwnership'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateEfpAccountMetadataUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpAccountMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__
 */
export const useWatchEfpAccountMetadataEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpAccountMetadataAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchEfpAccountMetadataOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpAccountMetadataAbi,
    eventName: 'OwnershipTransferred'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchEfpAccountMetadataPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpAccountMetadataAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"ProxyAdded"`
 */
export const useWatchEfpAccountMetadataProxyAddedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpAccountMetadataAbi,
  eventName: 'ProxyAdded'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"ProxyRemoved"`
 */
export const useWatchEfpAccountMetadataProxyRemovedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpAccountMetadataAbi,
    eventName: 'ProxyRemoved'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchEfpAccountMetadataUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpAccountMetadataAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpAccountMetadataAbi}__ and `eventName` set to `"UpdateAccountMetadata"`
 */
export const useWatchEfpAccountMetadataUpdateAccountMetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpAccountMetadataAbi,
    eventName: 'UpdateAccountMetadata'
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const useReadEfpListMinter = /*#__PURE__*/ createUseReadContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"accountMetadata"`
 */
export const useReadEfpListMinterAccountMetadata = /*#__PURE__*/ createUseReadContract({
  abi: efpListMinterAbi,
  functionName: 'accountMetadata'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"listRecordsL1"`
 */
export const useReadEfpListMinterListRecordsL1 = /*#__PURE__*/ createUseReadContract({
  abi: efpListMinterAbi,
  functionName: 'listRecordsL1'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"owner"`
 */
export const useReadEfpListMinterOwner = /*#__PURE__*/ createUseReadContract({
  abi: efpListMinterAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"paused"`
 */
export const useReadEfpListMinterPaused = /*#__PURE__*/ createUseReadContract({
  abi: efpListMinterAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"registry"`
 */
export const useReadEfpListMinterRegistry = /*#__PURE__*/ createUseReadContract({
  abi: efpListMinterAbi,
  functionName: 'registry'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const useWriteEfpListMinter = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useWriteEfpListMinterClaimReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMint"`
 */
export const useWriteEfpListMinterEasyMint = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'easyMint'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMintTo"`
 */
export const useWriteEfpListMinterEasyMintTo = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'easyMintTo'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteEfpListMinterPause = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteEfpListMinterRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useWriteEfpListMinterSetReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteEfpListMinterTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteEfpListMinterUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: efpListMinterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const useSimulateEfpListMinter = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useSimulateEfpListMinterClaimReverseEns = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMint"`
 */
export const useSimulateEfpListMinterEasyMint = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'easyMint'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"easyMintTo"`
 */
export const useSimulateEfpListMinterEasyMintTo = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'easyMintTo'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateEfpListMinterPause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateEfpListMinterRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useSimulateEfpListMinterSetReverseEns = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateEfpListMinterTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListMinterAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateEfpListMinterUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListMinterAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__
 */
export const useWatchEfpListMinterEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListMinterAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchEfpListMinterOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListMinterAbi,
    eventName: 'OwnershipTransferred'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchEfpListMinterPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListMinterAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListMinterAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchEfpListMinterUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListMinterAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const useReadEfpListRecords = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getAllListOps"`
 */
export const useReadEfpListRecordsGetAllListOps = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getAllListOps'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListManager"`
 */
export const useReadEfpListRecordsGetListManager = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOp"`
 */
export const useReadEfpListRecordsGetListOp = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOp'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOpCount"`
 */
export const useReadEfpListRecordsGetListOpCount = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOpCount'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListOpsInRange"`
 */
export const useReadEfpListRecordsGetListOpsInRange = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListOpsInRange'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getListUser"`
 */
export const useReadEfpListRecordsGetListUser = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const useReadEfpListRecordsGetMetadataValue = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const useReadEfpListRecordsGetMetadataValues = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"listOps"`
 */
export const useReadEfpListRecordsListOps = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'listOps'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"owner"`
 */
export const useReadEfpListRecordsOwner = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"paused"`
 */
export const useReadEfpListRecordsPaused = /*#__PURE__*/ createUseReadContract({
  abi: efpListRecordsAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const useWriteEfpListRecords = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const useWriteEfpListRecordsApplyListOp = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const useWriteEfpListRecordsApplyListOps = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const useWriteEfpListRecordsClaimListManager = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const useWriteEfpListRecordsClaimListManagerForAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: efpListRecordsAbi,
    functionName: 'claimListManagerForAddress'
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useWriteEfpListRecordsClaimReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteEfpListRecordsPause = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteEfpListRecordsRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const useWriteEfpListRecordsSetListManager = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const useWriteEfpListRecordsSetListUser = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const useWriteEfpListRecordsSetMetadataValue = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const useWriteEfpListRecordsSetMetadataValues = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const useWriteEfpListRecordsSetMetadataValuesAndApplyListOps =
  /*#__PURE__*/ createUseWriteContract({
    abi: efpListRecordsAbi,
    functionName: 'setMetadataValuesAndApplyListOps'
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useWriteEfpListRecordsSetReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteEfpListRecordsTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteEfpListRecordsUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const useSimulateEfpListRecords = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const useSimulateEfpListRecordsApplyListOp = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const useSimulateEfpListRecordsApplyListOps = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const useSimulateEfpListRecordsClaimListManager = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const useSimulateEfpListRecordsClaimListManagerForAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpListRecordsAbi,
    functionName: 'claimListManagerForAddress'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useSimulateEfpListRecordsClaimReverseEns = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateEfpListRecordsPause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateEfpListRecordsRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const useSimulateEfpListRecordsSetListManager = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const useSimulateEfpListRecordsSetListUser = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const useSimulateEfpListRecordsSetMetadataValue = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const useSimulateEfpListRecordsSetMetadataValues = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const useSimulateEfpListRecordsSetMetadataValuesAndApplyListOps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpListRecordsAbi,
    functionName: 'setMetadataValuesAndApplyListOps'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useSimulateEfpListRecordsSetReverseEns = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateEfpListRecordsTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateEfpListRecordsUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__
 */
export const useWatchEfpListRecordsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRecordsAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"ListOp"`
 */
export const useWatchEfpListRecordsListOpEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'ListOp'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchEfpListRecordsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRecordsAbi,
    eventName: 'OwnershipTransferred'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchEfpListRecordsPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchEfpListRecordsUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRecordsAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRecordsAbi}__ and `eventName` set to `"UpdateListMetadata"`
 */
export const useWatchEfpListRecordsUpdateListMetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRecordsAbi,
    eventName: 'UpdateListMetadata'
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const useReadEfpListRegistry = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadEfpListRegistryBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'balanceOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"explicitOwnershipOf"`
 */
export const useReadEfpListRegistryExplicitOwnershipOf = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'explicitOwnershipOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"explicitOwnershipsOf"`
 */
export const useReadEfpListRegistryExplicitOwnershipsOf = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'explicitOwnershipsOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadEfpListRegistryGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getApproved'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getListStorageLocation"`
 */
export const useReadEfpListRegistryGetListStorageLocation = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getListStorageLocation'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getMaxMintBatchSize"`
 */
export const useReadEfpListRegistryGetMaxMintBatchSize = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getMaxMintBatchSize'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getMintState"`
 */
export const useReadEfpListRegistryGetMintState = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getMintState'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"getPriceOracle"`
 */
export const useReadEfpListRegistryGetPriceOracle = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'getPriceOracle'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadEfpListRegistryIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'isApprovedForAll'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"name"`
 */
export const useReadEfpListRegistryName = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'name'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadEfpListRegistryOwner = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadEfpListRegistryOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'ownerOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"paused"`
 */
export const useReadEfpListRegistryPaused = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadEfpListRegistrySupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'supportsInterface'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadEfpListRegistrySymbol = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'symbol'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadEfpListRegistryTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'tokenURI'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"tokensOfOwner"`
 */
export const useReadEfpListRegistryTokensOfOwner = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'tokensOfOwner'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"tokensOfOwnerIn"`
 */
export const useReadEfpListRegistryTokensOfOwnerIn = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'tokensOfOwnerIn'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadEfpListRegistryTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: efpListRegistryAbi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const useWriteEfpListRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteEfpListRegistryApprove = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useWriteEfpListRegistryClaimReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteEfpListRegistryMint = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const useWriteEfpListRegistryMintBatch = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatchTo"`
 */
export const useWriteEfpListRegistryMintBatchTo = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintTo"`
 */
export const useWriteEfpListRegistryMintTo = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteEfpListRegistryPause = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteEfpListRegistryRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteEfpListRegistrySafeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'safeTransferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteEfpListRegistrySetApprovalForAll = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setApprovalForAll'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const useWriteEfpListRegistrySetListStorageLocation = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setListStorageLocation'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const useWriteEfpListRegistrySetMaxMintBatchSize = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setMaxMintBatchSize'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMintState"`
 */
export const useWriteEfpListRegistrySetMintState = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setPriceOracle"`
 */
export const useWriteEfpListRegistrySetPriceOracle = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setPriceOracle'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useWriteEfpListRegistrySetReverseEns = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteEfpListRegistryTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteEfpListRegistryTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteEfpListRegistryUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: efpListRegistryAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const useSimulateEfpListRegistry = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateEfpListRegistryApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'approve'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"claimReverseENS"`
 */
export const useSimulateEfpListRegistryClaimReverseEns = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'claimReverseENS'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateEfpListRegistryMint = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const useSimulateEfpListRegistryMintBatch = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintBatchTo"`
 */
export const useSimulateEfpListRegistryMintBatchTo = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"mintTo"`
 */
export const useSimulateEfpListRegistryMintTo = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateEfpListRegistryPause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateEfpListRegistryRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateEfpListRegistrySafeTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'safeTransferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateEfpListRegistrySetApprovalForAll = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setApprovalForAll'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const useSimulateEfpListRegistrySetListStorageLocation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpListRegistryAbi,
    functionName: 'setListStorageLocation'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const useSimulateEfpListRegistrySetMaxMintBatchSize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: efpListRegistryAbi,
    functionName: 'setMaxMintBatchSize'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setMintState"`
 */
export const useSimulateEfpListRegistrySetMintState = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setPriceOracle"`
 */
export const useSimulateEfpListRegistrySetPriceOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setPriceOracle'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"setReverseENS"`
 */
export const useSimulateEfpListRegistrySetReverseEns = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'setReverseENS'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateEfpListRegistryTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'transferFrom'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateEfpListRegistryTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link efpListRegistryAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateEfpListRegistryUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: efpListRegistryAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__
 */
export const useWatchEfpListRegistryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRegistryAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchEfpListRegistryApprovalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Approval'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchEfpListRegistryApprovalForAllEvent = /*#__PURE__*/ createUseWatchContractEvent(
  {
    abi: efpListRegistryAbi,
    eventName: 'ApprovalForAll'
  }
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"ConsecutiveTransfer"`
 */
export const useWatchEfpListRegistryConsecutiveTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'ConsecutiveTransfer'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"MaxMintBatchSizeChange"`
 */
export const useWatchEfpListRegistryMaxMintBatchSizeChangeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'MaxMintBatchSizeChange'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"MintStateChange"`
 */
export const useWatchEfpListRegistryMintStateChangeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'MintStateChange'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchEfpListRegistryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'OwnershipTransferred'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchEfpListRegistryPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"PriceOracleChange"`
 */
export const useWatchEfpListRegistryPriceOracleChangeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'PriceOracleChange'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchEfpListRegistryTransferEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Transfer'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchEfpListRegistryUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: efpListRegistryAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link efpListRegistryAbi}__ and `eventName` set to `"UpdateListStorageLocation"`
 */
export const useWatchEfpListRegistryUpdateListStorageLocationEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: efpListRegistryAbi,
    eventName: 'UpdateListStorageLocation'
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const useReadIefpListRegistryErc721 = /*#__PURE__*/ createUseReadContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getListStorageLocation"`
 */
export const useReadIefpListRegistryErc721GetListStorageLocation =
  /*#__PURE__*/ createUseReadContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'getListStorageLocation'
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getMaxMintBatchSize"`
 */
export const useReadIefpListRegistryErc721GetMaxMintBatchSize = /*#__PURE__*/ createUseReadContract(
  {
    abi: iefpListRegistryErc721Abi,
    functionName: 'getMaxMintBatchSize'
  }
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"getMintState"`
 */
export const useReadIefpListRegistryErc721GetMintState = /*#__PURE__*/ createUseReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'getMintState'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadIefpListRegistryErc721OwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'ownerOf'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadIefpListRegistryErc721TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'totalSupply'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const useWriteIefpListRegistryErc721 = /*#__PURE__*/ createUseWriteContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteIefpListRegistryErc721Mint = /*#__PURE__*/ createUseWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatch"`
 */
export const useWriteIefpListRegistryErc721MintBatch = /*#__PURE__*/ createUseWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatchTo"`
 */
export const useWriteIefpListRegistryErc721MintBatchTo = /*#__PURE__*/ createUseWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatchTo'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintTo"`
 */
export const useWriteIefpListRegistryErc721MintTo = /*#__PURE__*/ createUseWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const useWriteIefpListRegistryErc721SetListStorageLocation =
  /*#__PURE__*/ createUseWriteContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setListStorageLocation'
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const useWriteIefpListRegistryErc721SetMaxMintBatchSize =
  /*#__PURE__*/ createUseWriteContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setMaxMintBatchSize'
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMintState"`
 */
export const useWriteIefpListRegistryErc721SetMintState = /*#__PURE__*/ createUseWriteContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'setMintState'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const useSimulateIefpListRegistryErc721 = /*#__PURE__*/ createUseSimulateContract({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateIefpListRegistryErc721Mint = /*#__PURE__*/ createUseSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mint'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatch"`
 */
export const useSimulateIefpListRegistryErc721MintBatch = /*#__PURE__*/ createUseSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintBatch'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintBatchTo"`
 */
export const useSimulateIefpListRegistryErc721MintBatchTo = /*#__PURE__*/ createUseSimulateContract(
  {
    abi: iefpListRegistryErc721Abi,
    functionName: 'mintBatchTo'
  }
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"mintTo"`
 */
export const useSimulateIefpListRegistryErc721MintTo = /*#__PURE__*/ createUseSimulateContract({
  abi: iefpListRegistryErc721Abi,
  functionName: 'mintTo'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setListStorageLocation"`
 */
export const useSimulateIefpListRegistryErc721SetListStorageLocation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setListStorageLocation'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMaxMintBatchSize"`
 */
export const useSimulateIefpListRegistryErc721SetMaxMintBatchSize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setMaxMintBatchSize'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `functionName` set to `"setMintState"`
 */
export const useSimulateIefpListRegistryErc721SetMintState =
  /*#__PURE__*/ createUseSimulateContract({
    abi: iefpListRegistryErc721Abi,
    functionName: 'setMintState'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__
 */
export const useWatchIefpListRegistryErc721Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: iefpListRegistryErc721Abi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link iefpListRegistryErc721Abi}__ and `eventName` set to `"UpdateListStorageLocation"`
 */
export const useWatchIefpListRegistryErc721UpdateListStorageLocationEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: iefpListRegistryErc721Abi,
    eventName: 'UpdateListStorageLocation'
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const useReadListMetadata = /*#__PURE__*/ createUseReadContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getListManager"`
 */
export const useReadListMetadataGetListManager = /*#__PURE__*/ createUseReadContract({
  abi: listMetadataAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getListUser"`
 */
export const useReadListMetadataGetListUser = /*#__PURE__*/ createUseReadContract({
  abi: listMetadataAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const useReadListMetadataGetMetadataValue = /*#__PURE__*/ createUseReadContract({
  abi: listMetadataAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const useReadListMetadataGetMetadataValues = /*#__PURE__*/ createUseReadContract({
  abi: listMetadataAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"owner"`
 */
export const useReadListMetadataOwner = /*#__PURE__*/ createUseReadContract({
  abi: listMetadataAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"paused"`
 */
export const useReadListMetadataPaused = /*#__PURE__*/ createUseReadContract({
  abi: listMetadataAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const useWriteListMetadata = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManager"`
 */
export const useWriteListMetadataClaimListManager = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const useWriteListMetadataClaimListManagerForAddress = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteListMetadataPause = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteListMetadataRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListManager"`
 */
export const useWriteListMetadataSetListManager = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListUser"`
 */
export const useWriteListMetadataSetListUser = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const useWriteListMetadataSetMetadataValue = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const useWriteListMetadataSetMetadataValues = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteListMetadataTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteListMetadataUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: listMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const useSimulateListMetadata = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManager"`
 */
export const useSimulateListMetadataClaimListManager = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const useSimulateListMetadataClaimListManagerForAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: listMetadataAbi,
    functionName: 'claimListManagerForAddress'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateListMetadataPause = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateListMetadataRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListManager"`
 */
export const useSimulateListMetadataSetListManager = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setListUser"`
 */
export const useSimulateListMetadataSetListUser = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const useSimulateListMetadataSetMetadataValue = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const useSimulateListMetadataSetMetadataValues = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateListMetadataTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listMetadataAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateListMetadataUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: listMetadataAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__
 */
export const useWatchListMetadataEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: listMetadataAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchListMetadataOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: listMetadataAbi,
    eventName: 'OwnershipTransferred'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchListMetadataPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: listMetadataAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchListMetadataUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: listMetadataAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listMetadataAbi}__ and `eventName` set to `"UpdateListMetadata"`
 */
export const useWatchListMetadataUpdateListMetadataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: listMetadataAbi,
    eventName: 'UpdateListMetadata'
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const useReadListRecords = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getAllListOps"`
 */
export const useReadListRecordsGetAllListOps = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getAllListOps'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListManager"`
 */
export const useReadListRecordsGetListManager = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getListManager'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOp"`
 */
export const useReadListRecordsGetListOp = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOp'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOpCount"`
 */
export const useReadListRecordsGetListOpCount = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOpCount'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListOpsInRange"`
 */
export const useReadListRecordsGetListOpsInRange = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getListOpsInRange'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getListUser"`
 */
export const useReadListRecordsGetListUser = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getListUser'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getMetadataValue"`
 */
export const useReadListRecordsGetMetadataValue = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getMetadataValue'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"getMetadataValues"`
 */
export const useReadListRecordsGetMetadataValues = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'getMetadataValues'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"listOps"`
 */
export const useReadListRecordsListOps = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'listOps'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"owner"`
 */
export const useReadListRecordsOwner = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'owner'
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"paused"`
 */
export const useReadListRecordsPaused = /*#__PURE__*/ createUseReadContract({
  abi: listRecordsAbi,
  functionName: 'paused'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const useWriteListRecords = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const useWriteListRecordsApplyListOp = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const useWriteListRecordsApplyListOps = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const useWriteListRecordsClaimListManager = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const useWriteListRecordsClaimListManagerForAddress = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'claimListManagerForAddress'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteListRecordsPause = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteListRecordsRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const useWriteListRecordsSetListManager = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const useWriteListRecordsSetListUser = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const useWriteListRecordsSetMetadataValue = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const useWriteListRecordsSetMetadataValues = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const useWriteListRecordsSetMetadataValuesAndApplyListOps =
  /*#__PURE__*/ createUseWriteContract({
    abi: listRecordsAbi,
    functionName: 'setMetadataValuesAndApplyListOps'
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteListRecordsTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteListRecordsUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: listRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const useSimulateListRecords = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOp"`
 */
export const useSimulateListRecordsApplyListOp = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'applyListOp'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"applyListOps"`
 */
export const useSimulateListRecordsApplyListOps = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'applyListOps'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManager"`
 */
export const useSimulateListRecordsClaimListManager = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'claimListManager'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"claimListManagerForAddress"`
 */
export const useSimulateListRecordsClaimListManagerForAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: listRecordsAbi,
    functionName: 'claimListManagerForAddress'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateListRecordsPause = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'pause'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateListRecordsRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'renounceOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListManager"`
 */
export const useSimulateListRecordsSetListManager = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setListManager'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setListUser"`
 */
export const useSimulateListRecordsSetListUser = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setListUser'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValue"`
 */
export const useSimulateListRecordsSetMetadataValue = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValue'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValues"`
 */
export const useSimulateListRecordsSetMetadataValues = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'setMetadataValues'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"setMetadataValuesAndApplyListOps"`
 */
export const useSimulateListRecordsSetMetadataValuesAndApplyListOps =
  /*#__PURE__*/ createUseSimulateContract({
    abi: listRecordsAbi,
    functionName: 'setMetadataValuesAndApplyListOps'
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateListRecordsTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'transferOwnership'
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link listRecordsAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateListRecordsUnpause = /*#__PURE__*/ createUseSimulateContract({
  abi: listRecordsAbi,
  functionName: 'unpause'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__
 */
export const useWatchListRecordsEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: listRecordsAbi
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"ListOp"`
 */
export const useWatchListRecordsListOpEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'ListOp'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchListRecordsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: listRecordsAbi,
    eventName: 'OwnershipTransferred'
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchListRecordsPausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'Paused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchListRecordsUnpausedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: listRecordsAbi,
  eventName: 'Unpaused'
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link listRecordsAbi}__ and `eventName` set to `"UpdateListMetadata"`
 */
export const useWatchListRecordsUpdateListMetadataEvent = /*#__PURE__*/ createUseWatchContractEvent(
  {
    abi: listRecordsAbi,
    eventName: 'UpdateListMetadata'
  }
)
