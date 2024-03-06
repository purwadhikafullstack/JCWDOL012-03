// import App from './app';

// const main = () => {
//   // init db here

//   const app = new App();
//   app.start();
// };

// main();

import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import apiRouter from './common/api.Router';
// import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-HTTP-Method-Override',
    ],
  }),
);
app.use(json());
// app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(` [API] -> http://localhost:${PORT}`);
});
