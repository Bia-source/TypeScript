import express from 'express';
import { createCourse } from './routes';

const app = express();

app.get("/", createCourse);

app.listen(1899);