import express, { Request, Response, Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

const app: Application = express();

// import routes
// import routes from './routes';

// setup middleware
app.use(compression()); // compress all middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(mongoSanitize()); // protects against MongoDB Operator Injection

// mount routes
//app.use('/', routes);

// index route
app.get('/', (req: Request, res: Response) => {
    return res.json({'message': 'Hello World'});
});

// handle 404 routes
app.all('*', (req: Request, res: Response) => {
    return res.status(404).send('The resource is not found :(');
});

export default app;