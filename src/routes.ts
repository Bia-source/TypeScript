import { Request, Response} from 'express';
import CreateCourseService from './createCourseService';

export function createCourse(request: Request, response: Response){
    const course = request.body;
    CreateCourseService.execute(course);
    return response.json(course);
}