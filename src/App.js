import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import AllowanceList from './components/AllowanceList';

function App() {
	const [account, setAccount] = useState(null);
	const [provider, setProvider] = useState(null);
	const [chainId, setChainId] = useState(null);

	const web3Modal = new Web3Modal({
		cacheProvider: true,
	});

	const connectWallet = async () => {
		try {
			const provider = await web3Modal.connect();
			const web3Provider = new ethers.providers.Web3Provider(provider);
			const signer = web3Provider.getSigner();
			const address = await signer.getAddress();
			const chainId = await web3Provider.getNetwork();

			setAccount(address);
			setProvider(web3Provider);
			setChainId(chainId.chainId);
			console.log('Connected to: ', address);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connectWallet();
		}
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{account ? (
					<div>
						<p>Connected to: {account}</p>
						<p>ChainId: {chainId}</p>
						<AllowanceList chainId={chainId} account={account} provider={provider} />
					</div>
				) : (
					<button onClick={() => connectWallet()}>Connect Wallet</button>
				)}
			</header>
		</div>
	);
}

export default App;
