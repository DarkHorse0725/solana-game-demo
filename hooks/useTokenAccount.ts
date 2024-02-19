import { unpackAccount } from '@solana/spl-token'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { useAccount } from './useAccount'

const parser = (pubkey: PublicKey, acct: AccountInfo<Buffer>) => {
  return unpackAccount(pubkey, acct)
}

export const useTokenAccount = (address?: PublicKey) => {
  return useAccount(address, parser)
}
