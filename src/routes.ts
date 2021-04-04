import { Request, Response} from 'express';
import CreateCourseService from './services/createCourseService';

export function createCourse(request: Request, response: Response){
    const course = request.body;
    CreateCourseService.execute(course);
    return response.json(course);
}