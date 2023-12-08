export const EFPListMinterABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_registryAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_accountMetadataAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_listMetadataAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_listRecordsL1',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
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
    inputs: [],
    name: 'accountMetadata',
    outputs: [
      {
        internalType: 'contract IEFPAccountMetadata',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'listMetadata',
    outputs: [
      {
        internalType: 'contract IEFPListMetadata',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'listRecordsL1',
    outputs: [
      {
        internalType: 'contract IEFPListRecords',
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
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'nonceL1',
        type: 'uint256'
      }
    ],
    name: 'mintToWithListLocationOnL1AndSetAsDefaultList',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'addressL2',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'nonceL2',
        type: 'uint256'
      }
    ],
    name: 'mintToWithListLocationOnL2AndSetAsDefaultList',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'nonceL1',
        type: 'uint256'
      }
    ],
    name: 'mintWithListLocationOnL1AndSetAsDefaultList',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'addressL2',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'nonceL2',
        type: 'uint256'
      }
    ],
    name: 'mintWithListLocationOnL2AndSetAsDefaultList',
    outputs: [],
    stateMutability: 'payable',
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
    inputs: [],
    name: 'registry',
    outputs: [
      {
        internalType: 'contract IEFPListRegistry_',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
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
