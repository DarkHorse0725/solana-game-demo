import NonceModel from "../models/NonceModel";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

export const verifyNonce = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;

  if (!body.wallet || !body.nonce) {
    return res.status(400).json({ error: "wallet and nonce must be strings" });
  }

  // Find nonce
  let foundNonce;
  try {
    foundNonce = await NonceModel.findOne({
      wallet: body.wallet,
      nonce: body.nonce,
    }).exec();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "db error" });
  }

  if (foundNonce === null)
    return res.status(400).json({ error: "Invalid nonce" });

  return NextResponse.next();
};
