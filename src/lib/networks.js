import { Network } from 'alchemy-sdk';

export const Networks = [
	{
		name: 'mainnet',
		chainId: 1,
		alchemyURL: 'https://eth-mainnet.g.alchemy.com/v2/8kGxNmqk4RQeWPMdFeNxGpUs9VNuVPqI',
		config: {
			apiKey: '8kGxNmqk4RQeWPMdFeNxGpUs9VNuVPqI', // Replace with your Alchemy API Key.
			network: Network.ETH_MAINNET, // Replace with your network.
			maxRetries: 10,
		},
		apiUrl: 'https://api.etherscan.io/api?module=account&action=txlist&address=',
		apiKey: 'MJF7WQNDCR9KSJ368RQ7G89U4VRJCYRWF6',
	},
	{
		name: 'goerli',
		chainId: 5,
		alchemyURL: 'https://eth-goerli.g.alchemy.com/v2/8FJqIJcsQwkliFtKtJ7HqTiALBCjuHg4',
		config: {
			apiKey: '8FJqIJcsQwkliFtKtJ7HqTiALBCjuHg4', // Replace with your Alchemy API Key.
			network: Network.ETH_GOERLI, // Replace with your network.
			maxRetries: 10,
		},
		apiUrl: 'https://api-goerli.etherscan.io/api?module=account&action=txlist&address=',
		apiKey: 'MJF7WQNDCR9KSJ368RQ7G89U4VRJCYRWF6',
	},
	{
		name: 'polygon mumabi',
		chainId: 80001,
		alchemyURL: 'https://polygon-mumbai.g.alchemy.com/v2/1IrhhhqnUlyA-gBzHb_hNY5GA4LREPMl',
		config: {
			apiKey: '1IrhhhqnUlyA-gBzHb_hNY5GA4LREPMl',
			network: Network.MATIC_MUMBAI,
			maxRetries: 10,
		},
		apiUrl: 'https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=',
		apiKey: '7UWXY2XFMPDEPYNGBB7AAI36X3R7N4ESCX',
	},
	{
		name: 'polygon mainnet',
		chainId: 137,
		alchemyURL: 'https://polygon-mainnet.g.alchemy.com/v2/rY_yz1505MAH5woKJM2fZQxZ09OQc9mB',
		config: {
			apiKey: 'rY_yz1505MAH5woKJM2fZQxZ09OQc9mB',
			network: Network.MATIC_MAINNET,
			maxRetries: 10,
		},
		apiUrl: 'https://api.polygonscan.com/api?module=account&action=txlist&address=',
		apiKey: '7UWXY2XFMPDEPYNGBB7AAI36X3R7N4ESCX',
	},
];
