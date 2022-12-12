import { ethers } from 'ethers';
import { Alchemy, Network } from 'alchemy-sdk';
import { Networks } from '../lib/networks';
import axios from 'axios';
import { ERC20ABI } from '../lib/abis';

const approvalHash = '0x095ea7b3';
const unlimitedAllowance = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const getTokenName = async (contractAddress, chainId) => {
	try {
		const network = Networks.find((network) => network.chainId === chainId);
		if (!network) {
			throw new Error('Network not found');
		}

		const alchemySDK = new Alchemy(network.config);

		const tokenData = await alchemySDK.core.getTokenMetadata(contractAddress);
		return tokenData;
	} catch (err) {
		console.log(err);
		return contractAddress;
	}
};

export const getApproveTransactions = async (chainId, address) => {
	try {
		const network = Networks.find((network) => network.chainId === chainId);
		if (!network) {
			throw new Error('Network not found');
		}

		let approved_transactions = [];

		const query = network.apiUrl + address + '&apikey=' + network.apiKey;

		const response = await axios.get(query, {
			headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
		});

		const transactions = response.data.result;

		for (let tx of transactions) {
			if (tx.input.includes(approvalHash)) {
				console.log('Found approval transaction: ', tx.hash);
				let approveObj = {};
				approveObj.contract = ethers.utils.getAddress(tx.to);
				approveObj.approved = ethers.utils.getAddress('0x' + tx.input.substring(34, 74));
				let allowance = tx.input.substring(74);
				if (allowance.includes(unlimitedAllowance)) {
					approveObj.allowance = 'Unlimited';
				} else {
					approveObj.allowance = allowance;
				}

				if (parseInt(allowance, 16) > 0) {
					approved_transactions.push(approveObj);
				} else {
					approved_transactions = approved_transactions.filter((tx) => {
						return !(tx.approved === approveObj.approved && tx.contract === tx.contract);
					});
				}

				const tokenData = await getTokenName(approveObj.contract, chainId);
				approveObj.token = tokenData;
			}
		}
		return approved_transactions;
	} catch (err) {
		if (err.response) {
			console.log(err.response.data);
			console.log(err.response.status);
			console.log(err.response.headers);
		} else {
			console.log(err);
		}
	}
};

export const revokeAllowance = async (chainId, account, provider, contractAddress, spenderAddress) => {
	try {
		const network = Networks.find((network) => network.chainId === chainId);
		if (!network) {
			throw new Error('Network not found');
		}
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, ERC20ABI, signer);
		const tx = await contract.approve(spenderAddress, 0);
		const txReceipt = await tx.wait();
		return txReceipt;
	} catch (err) {
		console.log(err);
	}
};
