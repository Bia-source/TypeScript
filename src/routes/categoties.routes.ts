import { Router } from 'express';
import { CategoryController } from '../modules/cars/controllers/categoryController';
import { CategoryRepositories } from '../modules/cars/repositories/category.repository';
import { CategoryService } from '../modules/cars/services/category.service';

const categoriesRoutes = Router();
const categoryController = new CategoryController();
const categoryRepository = new CategoryRepositories();
const categoryService = new CategoryService(categoryRepository);

categoriesRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;
    categoryService.execute({ name, description});
    return response.status(201).json(categoryService);
});

categoriesRoutes.get("/", (request, response)=>{
    const listCategories = categoryRepository.list();
    return response.status(200).json({ listCategories });
});

categoriesRoutes.get("/", (request, response)=>{
    const res = categoryController.filterByName(request, response);
    return response.json(res);
})
export { categoriesRoutes };