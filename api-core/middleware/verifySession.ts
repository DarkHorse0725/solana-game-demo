import SessionModel from "../models/SessionModel";
import "../models/UserModel";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';

export const verifySession = async function (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.cookies || !req.cookies.session) {
    return res.status(400).json({ error: "invalid session" });
  }
  let foundSession;
  
  try {
    foundSession = await SessionModel.findOne({
      session_id: req.cookies.session,
    })
      .populate("user")
      .exec();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "db error" });
  }
  if (foundSession !== null) {
    (res as any).locals.user = foundSession.user;
    return true;
  }
  res.setHeader(
    "Set-Cookie",
    "token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  return res.status(400).json({ error: "invalid session" });;
};
