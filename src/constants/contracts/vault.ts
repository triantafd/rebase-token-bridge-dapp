export const VAULT_ABI = [
  {
    type: 'function',
    name: 'deposit',
    stateMutability: 'payable',
    inputs: [],
    outputs: []
  },
  {
    type: 'function',
    name: 'redeem',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'amount',
        type: 'uint256'
      }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [
      {
        name: 'account',
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
    type: 'event',
    name: 'Deposit',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false
      }
    ]
  },
  {
    type: 'event',
    name: 'Redeem',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false
      }
    ]
  }
] as const;

export const VAULT_ADDRESSES = {
  sepolia: '0xe72D410E445A432B09d0d2978b53d09b2b43A7ba',
};

export const VAULT_CONTRACTS = {
  sepolia: {
    address: VAULT_ADDRESSES.sepolia,
    abi: VAULT_ABI,
  },
}; 