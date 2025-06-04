export const REBASE_TOKEN_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'owner',
        type: 'address'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'to',
        type: 'address'
      },
      {
        name: 'amount',
        type: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ]
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'spender',
        type: 'address'
      },
      {
        name: 'amount',
        type: 'uint256'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ]
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      {
        name: 'owner',
        type: 'address'
      },
      {
        name: 'spender',
        type: 'address'
      }
    ],
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'totalSupply',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'name',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ]
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ]
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8'
      }
    ]
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true
      },
      {
        name: 'to',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false
      }
    ]
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false
      }
    ]
  }
];

export const REBASE_TOKEN_ADDRESSES = {
  sepolia: '0x671dBEe3bA15eF789ba7c0Fc0db912C41C2DB764',
  arbitrumSepolia: '0xEF1d5a4C1B3D5Cac3A20B7E10e5F146998C09Aa6',
};

export const REBASE_TOKEN_CONTRACTS = {
  sepolia: {
    address: REBASE_TOKEN_ADDRESSES.sepolia,
    abi: REBASE_TOKEN_ABI,
  },
  arbitrumSepolia: {
    address: REBASE_TOKEN_ADDRESSES.arbitrumSepolia,
    abi: REBASE_TOKEN_ABI,
  },
}; 