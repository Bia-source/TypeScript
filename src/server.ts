import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import connection  from './conection/database';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import "dotenv/config";
import { router } from './routes/index';
import "./database";
import "./shared/container";
import { AppError } from './shared/Error/AppError';

const app = express();

connection();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        error: `Internal server error - ${err.message}`
    });
});

app.use(router);



app.listen(1899);