import { useTokenBalance, useEthers } from '@usedapp/core'
import { formatAmount } from '@funcblock/dapp-sdk'
import { NiuTokenAddress } from '../config/contracts'

export const useBalance = () => {
  const { account } = useEthers()
  const balance = useTokenBalance(NiuTokenAddress, account)

  return {
    balance: formatAmount(balance, 18),
    balanceRaw: balance,
    account,
  }
}
