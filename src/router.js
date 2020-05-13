import { Router } from 'express';
import { getClientIp } from 'request-ip';
import { getGEOIPInfo } from './components/ipData.js';
const router = Router();

router.get('/status', (req, res) => {
  res.json({
    status: 'running'
  });
  res.end();
});

router.get('/:query?', async (req, res) => {
  const query = req.params.query || getClientIp(req);
  const result = await getGEOIPInfo({ query });
  res.send(JSON.stringify(result, null, 2));
  res.end();
});

export default router;
