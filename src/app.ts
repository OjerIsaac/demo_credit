import express, { Request, Response, Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from "path";
import { errorResponse, successResponse } from './utils/lib/response';
import httpErrors from './utils/constants/httpErrors';

const app: Application = express();

// import routes
// import routes from './routes';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static( path.join(__dirname, 'public') )); // expose public folder
// setup middleware
app.use(compression()); // compress all middleware
app.use(helmet());

// mount routes
//app.use('/', routes);

// index route
app.get('/', (req: Request, res: Response) => {
    return res.json({res: 'Welcome to Lendsqr Backend Service'});
});

// handle 404 routes
app.all('*', (req: Request, res: Response) => {
    return errorResponse(res, httpErrors.NotFoundError, "Page Not Found :(");
});

export default app;