import { Router } from 'express';
import { CategoryRepositories } from '../repositories/category.repository';
import { CategoryService } from '../services/category.service';

const categoriesRoutes = Router();

const categoryRepository = new CategoryRepositories();
categoriesRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;
    const categoryService = new CategoryService(categoryRepository);
    categoryService.execute({ name, description});
    return response.status(200).json();
});

categoriesRoutes.get("/", (request, response)=>{
    const listCategories = categoryRepository.getList();
    return response.status(200).json({ listCategories });
})

export { categoriesRoutes };