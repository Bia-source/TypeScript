interface Course{
    name: String;
    duration?: number;
    educator: String;
}
class CreateCourseService {
    // execute({ name, duration, educator }: Course){}
    execute(course: Course){
        console.log(course);
    }
}
export default new CreateCourseService();