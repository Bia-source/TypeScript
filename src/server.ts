import express, { json } from 'express';
import { createCourse } from './routes';

const app = express();

app.use(json());

app.post("/", createCourse);

app.listen(1899);