import dotenv from 'dotenv';
import express, { json } from 'express';
import helmet from 'helmet';
import router from './router.mjs';

dotenv.config();
const PORT = process.env.API_PORT || 3000;
const app = express();

app.use(helmet());
app.use(json());
app.use((_req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});
app.use('/', router);

app.listen(PORT, () => {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  console.log(`Server listening on port ${PORT}!`);
});
