import { Router } from 'express';
import { getClientIp } from 'request-ip';
import { getGEOIPInfo } from './components/ipData.mjs';
const router = Router();

router.get('/status', (req, res) => {
  res.json({
    status: 'running',
  });
  res.end();
});

router.get('/:query?', async (req, res) => {
  const query = req.params.query || getClientIp(req);
  const { data, error } = await getGEOIPInfo({ query });

  if (error) res.status(404).send(error);

  res.send(JSON.stringify(data, null, 2));
  res.end();
});

export default router;
