import express, { json } from 'express';
import  connection  from './conection/database';
import { categoriesRoutes } from './routes/categoties.routes';
import { specificationRoutes } from './routes/specification.routes';

const app = express();

connection();
app.use(json());

app.use("/categories",categoriesRoutes);
app.use("/specification",specificationRoutes);

app.listen(1899);