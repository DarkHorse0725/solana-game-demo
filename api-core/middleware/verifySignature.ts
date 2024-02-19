import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export const verifySignature = async function (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body } = req;

  if (!body.wallet || !body.nonce || !body.message || !body.signature) {
    res
      .status(400)
      .json({ error: "wallet, nonce, message and signature must be strings" });
  }

  const nonce = body.message.substring(29);
  if (nonce !== body.nonce)
    return res.status(400).json({ error: "Nonce not matching" });

  // Validate signed message
  const encodedMessage = new TextEncoder().encode(body.message);
  const publicKey = new PublicKey(body.wallet).toBytes();
  const encryptedSignature = new Uint8Array(body.signature);
  const isValidSignature = nacl.sign.detached.verify(
    encodedMessage,
    encryptedSignature,
    publicKey
  );

  if (!isValidSignature)
    return res.status(400).json({ error: "Invalid signature" });

  return true;
};
