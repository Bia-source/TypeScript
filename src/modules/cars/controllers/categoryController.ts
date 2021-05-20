import { Request, Response } from 'express';
import { CategoryRepositories } from '../repositories/category.repository';
import { CategoryService } from '../services/category.service';
const categoryRepository = new CategoryRepositories();
const categoryService = new CategoryService(categoryRepository);
class CategoryController{
   
    //TODO IMPLEMENTAR CRIAÇÃO DE CATEGORIA PELO CONTROLLER
    // handleCreateCategory(request: Request, response: Response): Response{
    //     const { name, description } = request.body;
    //     categoryService.execute({ name, description});
    //     console.log(categoryService)
    //     return response.status(201).json(categoryService);
    // }

    handleListCategory(request: Request, response: Response): Response{
        const { name } = request.body;
       const listCategories = categoryRepository.list();
       categoryService.findByName(name);
       return response.status(200).json({ listCategories });
    }

    filterByName(request: Request, response: Response): Response{
        const { name } = request.body;
        const category = categoryRepository.findByName(name);
        return response.status(200).json({category});
    }
}

export { CategoryController };