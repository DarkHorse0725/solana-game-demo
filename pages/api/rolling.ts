import { rolling } from '@/api-core/controllers/GameController'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>): Promise<void> => {
    await rolling(req, res)
}

export default handler