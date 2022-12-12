import React, { useEffect } from 'react';
import { getApproveTransactions, revokeAllowance } from '../utils/helper';

const AllowanceList = ({ chainId, account, provider }) => {
	const [allowances, setAllowances] = React.useState([]);

	useEffect(() => {
		if (account && provider) {
			const getAllowances = async () => {
				const allowances = await getApproveTransactions(chainId, account);
				console.log(allowances);
				setAllowances(allowances);
			};
			getAllowances();
		}
	}, []);

	const handleRevoke = async (tokenAddress, spenderAddress) => {
		const result = await revokeAllowance(chainId, account, provider, tokenAddress, spenderAddress);
		console.log(result);
	};

	return (
		<div>
			{allowances.length > 0 ? (
				<div>
					<p>Allowances</p>
					<ul>
						{allowances.map((allowance, index) => {
							return (
								<li key={index}>
									<p>Token: {allowance.token.name}</p>
									<p>Amount: {allowance.allowance}</p>
									<p>Spender: {allowance.approved}</p>
                                    <button onClick={() => handleRevoke(allowance.contract, allowance.approved)}>Revoke</button>
								</li>
							);
						})}
					</ul>
				</div>
			) : (
				<div>
					<p>No allowances found</p>
				</div>
			)}
		</div>
	);
};

export default AllowanceList;
