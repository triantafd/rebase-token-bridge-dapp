export const CCIP_ROUTER_ABI = [
  {
    type: 'function',
    name: 'getFee',
    stateMutability: 'view',
    inputs: [
      {
        name: 'destinationChainSelector',
        type: 'uint64'
      },
      {
        name: 'message',
        type: 'tuple',
        components: [
          {
            name: 'receiver',
            type: 'bytes'
          },
          {
            name: 'data',
            type: 'bytes'
          },
          {
            name: 'tokenAmounts',
            type: 'tuple[]',
            components: [
              {
                name: 'token',
                type: 'address'
              },
              {
                name: 'amount',
                type: 'uint256'
              }
            ]
          },
          {
            name: 'feeToken',
            type: 'address'
          },
          {
            name: 'extraArgs',
            type: 'bytes'
          }
        ]
      }
    ],
    outputs: [
      {
        name: 'fee',
        type: 'uint256'
      }
    ]
  },
  {
    type: 'function',
    name: 'ccipSend',
    stateMutability: 'payable',
    inputs: [
      {
        name: 'destinationChainSelector',
        type: 'uint64'
      },
      {
        name: 'message',
        type: 'tuple',
        components: [
          {
            name: 'receiver',
            type: 'bytes'
          },
          {
            name: 'data',
            type: 'bytes'
          },
          {
            name: 'tokenAmounts',
            type: 'tuple[]',
            components: [
              {
                name: 'token',
                type: 'address'
              },
              {
                name: 'amount',
                type: 'uint256'
              }
            ]
          },
          {
            name: 'feeToken',
            type: 'address'
          },
          {
            name: 'extraArgs',
            type: 'bytes'
          }
        ]
      }
    ],
    outputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ]
  }
];

export const CCIP_ROUTER_ADDRESSES = {
  sepolia: '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59', // Sepolia CCIP Router
  arbitrumSepolia: '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165', // Arbitrum Sepolia CCIP Router
};

export const CCIP_ROUTER_CONTRACTS = {
  sepolia: {
    address: CCIP_ROUTER_ADDRESSES.sepolia,
    abi: CCIP_ROUTER_ABI,
  },
  arbitrumSepolia: {
    address: CCIP_ROUTER_ADDRESSES.arbitrumSepolia,
    abi: CCIP_ROUTER_ABI,
  },
}; 