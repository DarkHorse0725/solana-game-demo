import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from "../models/UserModel";
import Joi from "joi";
import * as web3 from "@solana/web3.js";
import bs58 from "bs58";
import base58 from "bs58";
import { verifySocketNonce } from '../middleware/verifySocketNonce';
import { ITEMS, INVENTORY } from '@/utils';

export const rolling = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let prizes: any[] = [];
    for (let i = 0; i < INVENTORY.length; i++) {
      const item = ITEMS.find(({ id }) => id == INVENTORY[i].item_id);
      for (let j = 0; j < INVENTORY[i].amount; j++) {
        prizes.push(item);
      }
    }

    let currentIndex = prizes.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [prizes[currentIndex], prizes[randomIndex]] = [
        prizes[randomIndex], prizes[currentIndex]];
    }

    randomIndex = Math.floor(Math.random() * prizes.length);
    return res.status(200).json({ item: prizes[randomIndex] });
  }
  catch (e) { console.log(e) }
  return res.status(400).json({ item: null });
};
