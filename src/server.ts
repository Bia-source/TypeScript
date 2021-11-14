import express from 'express';
import connection  from './conection/database';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import { router } from './routes/index';
import "./database";
import "./shared/container";

const app = express();

connection();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(1899);