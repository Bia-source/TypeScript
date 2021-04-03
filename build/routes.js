"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
var createCourseService_1 = __importDefault(require("./createCourseService"));
function createCourse(request, response) {
    var course = {
        educator: "Dani",
        name: "nodejs",
        duration: 3,
    };
    createCourseService_1.default.execute(course);
    return response.json(course);
}
exports.createCourse = createCourse;
