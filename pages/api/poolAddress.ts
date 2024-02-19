import { getPoolAddress } from '@/api-core/controllers/TransactionController'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
  await getPoolAddress(req, res)
}

export default handler
