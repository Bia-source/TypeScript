"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateCourseService = /** @class */ (function () {
    function CreateCourseService() {
    }
    CreateCourseService.prototype.execute = function (course) {
        console.log(course);
    };
    return CreateCourseService;
}());
exports.default = new CreateCourseService();
