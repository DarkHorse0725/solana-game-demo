import type { NextApiRequest, NextApiResponse } from 'next'
const mongoose = require('mongoose');
export const verifyDbConnection = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(mongoose.connection.readyState === 0){
    try{
      mongoose.set('strictQuery', false);
      await mongoose.connect(process.env.MONGO_URI || '')
      console.log("Database connected");
    } catch(e){
      console.log(e)
    }
  }
  return true;
};
