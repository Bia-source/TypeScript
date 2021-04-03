import express, { request } from 'express';
import { createCourse } from './routes';

const app = express();

app.get("/", createCourse);
app.post("/",(request, response)=>{
    return response.json({message: "hello "});
})

app.listen(1899);