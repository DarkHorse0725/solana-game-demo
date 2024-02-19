import NonceModel from "../models/NonceModel";

export const verifySocketNonce = async function (body: any) {
  if (!body.wallet || !body.nonce) {
    return { success: false, error: "wallet and nonce must be strings" };
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
    return { success: false, error: "db error" };
  }

  if (foundNonce === null)
    return { success: false, error: "Invalid nonce" };

  return { success: true }
};
