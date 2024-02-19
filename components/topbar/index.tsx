/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Keypair } from '@solana/web3.js'
import { getTokenAccountInfo, getWalletTokenAccount } from '@/utils/spl-utils/common'
import { TOKEN_DECIMALS, TOKEN_MINT, MIN_SOL_BALANCE, COIN_PRICE } from '@/utils'
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token'
import { getPoolAddress, rolling } from '@/functions/api-queries'
import { Button } from '../common'
import { toast } from 'react-hot-toast'

export const Topbar = () => {
  const [rendered, setRendered] = useState(false);
  const [isSol, setIsSol] = useState(true);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balanceToken, setBalanceToken] = useState(0);
  const { connection } = useConnection();
  const { publicKey, connected, signMessage, signTransaction } = useWallet();
  const [poolAddress, setPoolAddress] = useState("");

  useEffect(() => {
    setRendered(true);
    setAmount(COIN_PRICE);
  }, [])

  useEffect(() => {
    if (connected && publicKey) {
      if (publicKey) {
        getPoolAddress().then((val) => {
          setPoolAddress(val);
        })
        connection.getBalance(publicKey).then((val) => {
          if (val > 0) {
            setBalance(val / LAMPORTS_PER_SOL);
          }
          getTokenAccountInfo(connection, publicKey, TOKEN_MINT).then((info: any) => {
            if (info) {
              setBalanceToken(info.uiAmount);
            }
          })
        })
      }
    }
  }, [publicKey, connected, connection])

  const handleInsertCoin = () => {    
    if (balance < MIN_SOL_BALANCE) {
      toast.error("Insufficient balance!");
      return;
    }

    if (isSol) {
      if (amount > balance) {
        toast.error("Insufficient balance!");
        return;
      }

      insertSol().then(() => {
        toast.success('success!');
        rolling().then((data: any) => {
          console.log(data);
        });
      })
    } else {
      if (amount > balanceToken) {
        toast.error("Insufficient balance!");
        return;
      }

      insertToken().then(() => {
        toast.success('success!');

      })
    }
  }

  const insertSol = async () => {
    if (publicKey && signTransaction) {
      try {
        const toPubkey = new PublicKey(poolAddress);
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toPubkey,
            lamports: Math.floor(LAMPORTS_PER_SOL * amount),
          })
        );
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (
          await connection.getLatestBlockhash()
        ).blockhash;
        const signedTransaction = await signTransaction(transaction);
        const sig = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );
        await connection.confirmTransaction(sig, "finalized");
      } catch (e) {
        toast.error("error occured!");
        console.log(e);
      }
    }
  }

  const insertToken = async () => {
    if (publicKey && signTransaction && amount < balanceToken) {
      try {
        const toPubkey = new PublicKey(poolAddress);
        const curAta = await getWalletTokenAccount(connection, publicKey, TOKEN_MINT)
        const ata = getAssociatedTokenAddressSync(TOKEN_MINT, toPubkey)
        const transaction = new Transaction();
        const ataAccountInfo = await connection.getAccountInfo(ata)
        if (!ataAccountInfo) {
          transaction.add(
            createAssociatedTokenAccountInstruction(
              publicKey,
              ata,
              toPubkey,
              TOKEN_MINT,
            )
          );
        }
        transaction.add(
          createTransferInstruction(
            curAta,
            ata,
            publicKey,
            amount * TOKEN_DECIMALS
          )
        )
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (
          await connection.getLatestBlockhash()
        ).blockhash;
        const signedTransaction = await signTransaction(transaction);
        const sig = await connection.sendRawTransaction(
          signedTransaction.serialize()
        );
        await connection.confirmTransaction(sig, "finalized");
      } catch (e) {
        toast.error("error occured!");
        console.log(e);
      }
    }
  }

  return rendered ? (
    <div className='flex flex-row-reverse w-full p-1'>
      <WalletMultiButton />
      <Button color='green' onClick={handleInsertCoin}>Insert Coin</Button>
    </div>
  ) : (
    <></>
  )
}
