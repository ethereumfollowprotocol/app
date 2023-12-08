export const EFPListMetadataABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'proxy',
        type: 'address'
      }
    ],
    name: 'ProxyAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'proxy',
        type: 'address'
      }
    ],
    name: 'ProxyRemoved',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'value',
        type: 'bytes'
      }
    ],
    name: 'ValueSet',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxy',
        type: 'address'
      }
    ],
    name: 'addProxy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'efpListRegistry',
    outputs: [
      {
        internalType: 'contract IERC721',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getEFPListRegistry',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string'
      }
    ],
    name: 'getValue',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'string[]',
        name: 'keys',
        type: 'string[]'
      }
    ],
    name: 'getValues',
    outputs: [
      {
        internalType: 'bytes[]',
        name: '',
        type: 'bytes[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxy',
        type: 'address'
      }
    ],
    name: 'isProxy',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'proxy',
        type: 'address'
      }
    ],
    name: 'removeProxy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'efpListRegistry_',
        type: 'address'
      }
    ],
    name: 'setEFPListRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string'
      },
      {
        internalType: 'bytes',
        name: 'value',
        type: 'bytes'
      }
    ],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string'
      },
      {
        internalType: 'bytes',
        name: 'value',
        type: 'bytes'
      },
      {
        internalType: 'string',
        name: 'key2',
        type: 'string'
      },
      {
        internalType: 'bytes',
        name: 'value2',
        type: 'bytes'
      }
    ],
    name: 'setValue2',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'key',
            type: 'string'
          },
          {
            internalType: 'bytes',
            name: 'value',
            type: 'bytes'
          }
        ],
        internalType: 'struct IEFPListMetadata.KeyValue[]',
        name: 'records',
        type: 'tuple[]'
      }
    ],
    name: 'setValues',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const
