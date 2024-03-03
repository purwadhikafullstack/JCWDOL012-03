// import express, {
//   json,
//   urlencoded,
//   Express,
//   Request,
//   Response,
//   NextFunction,
//   Router,
// } from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { PORT } from './config';
// // import { SampleRouter } from './router/sample.router';

// // const app = express();

// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(cors({ origin: ['http://localhost:3000'], credentials: true }))
// // app.use(urlencoded({ extended: true }));
// // app.use(
// //   '/api',
// //   // userRouter
// // );

// // app.listen(PORT, () => {
// //   console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
// // });

// // app.get('/test', (req: Request, res: Response, next: NextFunction) => {
// //   res.
// // status(200).json({
// //     success: true,
// //     message: 'API is working',
// //   });
// // });

// // app.all('*', (req: Request, res: Response, next: NextFunction) => {
// //   const err = new Error(`Route ${req.originalUrl} not found`) as any;
// //   err.statusCode = 404;
// //   next(err);
// // });

// export default class App {
//   private app: Express;

//   constructor() {
//     this.app = express();
//     this.configure();
//     this.routes();
//     this.handleError();
//   }

//   private configure(): void {
//     this.app.use(cors());
//     this.app.use(json());
//     this.app.use(cookieParser());
//     this.app.use(urlencoded({ extended: true }));
//   }

//   private handleError(): void {
//     // not found
//     this.app.use((req: Request, res: Response, next: NextFunction) => {
//       if (req.path.includes('/api/')) {
//         res.status(404).send('Not found !');
//       } else {
//         next();
//       }
//     });

//     // error
//     this.app.use(
//       (err: Error, req: Request, res: Response, next: NextFunction) => {
//         if (req.path.includes('/api/')) {
//           console.error('Error : ', err.stack);
//           res.status(500).send('Error !');
//         } else {
//           next();
//         }
//       },
//     );
//   }

//   private routes(): void {
//     const sampleRouter = new SampleRouter();

//     // this.app.get('/', (req: Request, res: Response) => {
//     //   res.send(`Hello, Purwadhika Student !`);
//     // });

//     this.app.use('/samples', sampleRouter.getRouter());
//   }

//   public start(): void {
//     this.app.listen(PORT, () => {
//       console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
//     });
//   }
// }
