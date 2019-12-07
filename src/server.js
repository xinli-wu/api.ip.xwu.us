// import "core-js/stable";
// import "regenerator-runtime/runtime";
require('dotenv').config()
import express, { json } from 'express';
import helmet from 'helmet';
import router from './router.js';

const PORT = process.env.API_PORT || 3000;
const app = express();

app.use(helmet());
app.use(json());
app.use((_req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use("/", router);

app.listen(PORT, () => {
  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  console.log(`Server listening on port ${PORT}!`);
});
// module.exports = app;
