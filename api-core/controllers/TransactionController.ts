import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from "../models/UserModel";
import Joi from "joi";
import * as web3 from "@solana/web3.js";
import bs58 from "bs58";
import base58 from "bs58";
import { getTokenAccountInfo } from '@/utils/spl-utils/common';
import { TOKEN_DECIMALS, TOKEN_MINT, MIN_SOL_BALANCE } from '@/utils';
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddressSync } from '@solana/spl-token';

const CLUSTER_ENDPOINT =
  process.env.CLUSTER_ENDPOINT || "https://api.devnet.solana.com/";
const connection = new web3.Connection(CLUSTER_ENDPOINT);
const poolSecretKeyStr = process.env.POOL_SECRET_KEY || "";
const poolSecretKey = bs58.decode(poolSecretKeyStr);
export const poolKeypair = web3.Keypair.fromSecretKey(poolSecretKey);

export const getPoolAddress = async function (req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ address: poolKeypair.publicKey.toString() });
}


