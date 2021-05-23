import express, { json } from 'express';
import  connection  from './conection/database';
import { router } from './routes/index';

const app = express();

connection();

app.use(json());

app.use(router);

app.listen(1899);