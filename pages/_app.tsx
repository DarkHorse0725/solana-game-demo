import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import { AppProps } from 'next/app'
import React, { Dispatch, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Topbar } from '../components/topbar'

import '@solana/wallet-adapter-react-ui/styles.css'
import '../styles/main.css'

import { AccountProvider } from '../hooks/accountContext'

interface IAdminContext {
  isAdmin: boolean
  setIsAdmin: Dispatch<React.SetStateAction<boolean>>
}

export const AdminContext = React.createContext<IAdminContext>({} as IAdminContext)

extend(relativeTime)
extend(utc)
extend(duration)

export type NetworkName = 'Devnet' | 'Mainnet' | 'Localnet'

const wrappedClusterApiUrl = (network: NetworkName, tls?: boolean): string => {
  if (network === 'Localnet') {
    return 'http://localhost:8899'
  }

  return clusterApiUrl(WalletAdapterNetwork[network], tls)
}

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [uiNetwork, setUiNetwork] = useState<NetworkName>('Devnet')
  const endpoint = useMemo(() => wrappedClusterApiUrl(uiNetwork), [uiNetwork])
  const [creditUpdated, setCreditUpdated] = useState(false);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter()
    ],
    []
  )
  return (
    <ConnectionProvider endpoint={endpoint}>
      <Toaster
        position='bottom-left'
        toastOptions={{
          style: {
            backgroundColor: '#334155',
            color: '#f9fafb',
            minWidth: '250px'
          }
        }}
      />
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AccountProvider commitment='confirmed'>
            <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
              <div className='app'>
                <Topbar/>
                <Component {...pageProps}/>
              </div>
            </AdminContext.Provider>
          </AccountProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
