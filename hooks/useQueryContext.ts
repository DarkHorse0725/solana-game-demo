import { useConnection } from '@solana/wallet-adapter-react'

export function useQueryContext() {
  const { connection } = useConnection()

  let endpoint = ''
  if (connection.rpcEndpoint.includes('devnet')) {
    endpoint = 'devnet'
  } else if (connection.rpcEndpoint.includes('testnet')) {
    endpoint = 'testnet'
  } else {
    endpoint = 'mainnet-beta'
  }

  const hasClusterOption = endpoint !== 'mainnet-beta'
  const fmtUrlWithCluster = (url: string) => {
    if (hasClusterOption) {
      const mark = url.includes('?') ? '&' : '?'
      return decodeURIComponent(`${url}${mark}cluster=${endpoint}`)
    }
    return url
  }

  return {
    fmtUrlWithCluster
  }
}
