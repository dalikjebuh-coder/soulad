import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Missing session ID' });
    }
    try {
      const data = await kv.get(`session:${id}`);
      if (data) {
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ error: 'Session not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to get session' });
    }
  }

  if (method === 'POST') {
    const { id, data } = req.body;
    if (!id || !data) {
      return res.status(400).json({ error: 'Missing id or data' });
    }
    try {
      await kv.set(`session:${id}`, data, { ex: 60 * 60 * 24 * 30 });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save session' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
