import { Request, Response} from 'express';
import CreateCourseService from './createCourseService';

export function createCourse(request: Request, response: Response){
    const course = {
        educator: "Dani",
        name: "nodejs", 
        duration: 3,
    }
    CreateCourseService.execute(course);
    return response.json(course);
}