import express, { json } from 'express';
import { categoriesRoutes } from './routes/categoties.routes';

const app = express();

app.use(json());

app.use("/categories",categoriesRoutes);

app.listen(1899);