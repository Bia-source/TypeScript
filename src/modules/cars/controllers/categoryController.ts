import { Request, Response } from 'express';
import { CategoryRepositories } from '../repositories/category.repository';
import { CategoryService } from '../services/category.service';

class CategoryController{
   private categoryRepository = CategoryRepositories.getIntance();
   private categoryService = new CategoryService(this.categoryRepository);

    handleCreateCategory(request: Request, response: Response): Response{
        const { name, description } = request.body;
        this.categoryService.execute({ name, description});
        return response.status(201);
    }

    handleListCategory(request: Request, response: Response): Response{
       const listCategories = this.categoryService.list();
       return response.status(200).json({ listCategories });
    }

    filterByName(request: Request, response: Response): Response{
        const { name } = request.body;
        const category = this.categoryService.findByName(name);
        return response.status(200).json({ category });
    }

    findById(request: Request, response: Response): Response{
        const { id } = request.params;
        const category = this.categoryService.findById(id);
        return response.status(200).json({ category });
    }

}

export { CategoryController };