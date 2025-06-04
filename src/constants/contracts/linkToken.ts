export const LINK_TOKEN_ABI = [
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
  }
];

export const LINK_TOKEN_ADDRESSES = {
  sepolia: '0x779877A7B0D9E8603169DdbD7836e478b4624789', // Sepolia LINK
  arbitrumSepolia: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E', // Arbitrum Sepolia LINK
};

export const LINK_TOKEN_CONTRACTS = {
  sepolia: {
    address: LINK_TOKEN_ADDRESSES.sepolia,
    abi: LINK_TOKEN_ABI,
  },
  arbitrumSepolia: {
    address: LINK_TOKEN_ADDRESSES.arbitrumSepolia,
    abi: LINK_TOKEN_ABI,
  },
}; 