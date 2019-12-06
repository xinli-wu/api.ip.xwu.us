import { Router } from 'express';
import { getClientIp } from 'request-ip';
import { getGEOIPInfo } from './components/ipData.js';
const router = Router();

router.get('/:ip?', async (req, res) => {
  const ip = req.params.ip || getClientIp(req);
  const result = await getGEOIPInfo({ ip });
  res.send(JSON.stringify(result, null, 2));
  res.end();
});

router.get('/status', (req, res) => {
  res.json({
    status: 'running'
  });
  res.end();
});

export default router;
