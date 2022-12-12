Here we have APIs that can return the allowances for a user address and revoke it.

1. `getApproveTransactions` - This API will read through all the transactions of the user and filter out the ones where the wallet has actually called the `Approve` method. And using this we can get all those that have unlimited allowance or minimal allowance and return it.
2. `revokeAllowance` - This API will revoke the allowance for certain contract address of a token and set it to 0.
