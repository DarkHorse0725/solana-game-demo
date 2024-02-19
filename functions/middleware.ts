// middleware.ts
import { verifyDbConnection } from '@/api-core/middleware/verifyDbConnection';
import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyNonce } from '../api-core/middleware/verifyNonce';
import { verifySession } from '../api-core/middleware/verifySession';
import { verifySignature } from '../api-core/middleware/verifySignature';

const verifyNonceUrls = [
  "/api/credit/deposit",
  "/api/credit/withdraw",
  "/api/user/authorize",
]
const verifySessionUrls = [
  "/api/credit/deposit",
  "/api/credit/withdraw",
  "/api/user/credit",
  "/api/user/depositAddress",
]
const verifySignatureUrls = [
  "/api/user/authorize",
]
const isIncluded = (urls: string[], url: string)=>{
  for(let i=0;i<urls.length;i++){
    if(url.startsWith(urls[i])){
      return true;
    }
  }
  return false;
}
export async function middleware(req: NextApiRequest, res: NextApiResponse) {
  
  await verifyDbConnection(req, res);
  
  if(req.url){
    if (isIncluded(verifyNonceUrls, req.url) && !(await verifyNonce(req, res))) {
      return false;
    }
    if (isIncluded(verifySessionUrls, req.url) && !(await verifySession(req, res))) {
      return false;
    }
    if (isIncluded(verifySignatureUrls, req.url) && !(await verifySignature(req, res))) {
      return false;
    }
  }
  return true;
}