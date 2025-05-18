import type { NextApiRequest, NextApiResponse } from 'next';
import { classifySentiment } from '@/lib/classifySentiment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { remark } = req.body;

  if (!remark) return res.status(400).json({ error: 'No remark provided' });

  try {
    const sentiment = await classifySentiment(remark);
    return res.status(200).json({ sentiment });
  } catch (error) {
    console.error('Error classifying sentiment:', error);
    return res.status(500).json({ error: 'Sentiment classification failed' });
  }
}
