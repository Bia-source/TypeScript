import { request, response, Router } from 'express';
import { CategoryRepositories } from '../modules/cars/repositories/category.repository';
import { CategoryService } from '../modules/cars/services/category.service';

const categoriesRoutes = Router();

const categoryRepository = new CategoryRepositories();
categoriesRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;
    const categoryService = new CategoryService(categoryRepository);
    categoryService.execute({ name, description});
    return response.status(201).json(categoryService);
});

categoriesRoutes.get("/", (request, response)=>{
    const listCategories = categoryRepository.list();
    return response.status(200).json({ listCategories });
});

categoriesRoutes.get("/", (request, response)=>{
    const { name } = request.body;
    const category = categoryRepository.findByName(name);
    return response.status(200).json({category});
})
export { categoriesRoutes };