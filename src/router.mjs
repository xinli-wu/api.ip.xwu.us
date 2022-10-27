import { Router } from 'express';
import { getClientIp } from 'request-ip';
import { getGeoIPInfo } from './components/ipData.mjs';
const router = Router();

router.get('/status', (_req, res) => {
  res.json({ status: 'running', }).end();
});

router.get('/:query?', async (req, res) => {
  const query = req.params.query || getClientIp(req);
  const { data, error } = await getGeoIPInfo({ query });

  if (error) res.status(404).send(error);

  res.send(JSON.stringify(data, null, 2)).end();
});

export default router;
