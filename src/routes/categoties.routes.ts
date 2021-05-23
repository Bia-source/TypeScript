import {  Router } from 'express';
import { CategoryController } from '../modules/cars/controllers/categoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();

categoriesRoutes.post("/", (request, response)=>{
    categoryController.handleCreateCategory(request,response); 
    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response)=>{
    const listCategories = categoryController.handleListCategory(request,response);
    return response.json({ listCategories });
});

categoriesRoutes.get("/", (request, response)=>{
    const category = categoryController.filterByName(request, response);
    return response.json({ category });
});

categoriesRoutes.get("/:id", (request, response)=>{
    const category = categoryController.findById(request,response);
    return response.json({ category }); 
});
export { categoriesRoutes };