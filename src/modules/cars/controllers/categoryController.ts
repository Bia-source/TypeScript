import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

class CategoryController{
   private categoryService = new CategoryService();

    async handleCreateCategory(request: Request, response: Response): Promise<Response>{
        const { name, description } = request.body;
        const category = await this.categoryService.execute({ name, description});
        return response.status(201).json({category:category});
    }

    async handleListCategory(request: Request, response: Response): Promise<Response>{
       const listCategories = await this.categoryService.list();
       return response.status(200).json({ listCategories:listCategories });
    }

    async filterByName(request: Request, response: Response): Promise<Response>{
        const { name } = request.body;
        const category = await this.categoryService.findByName(name);
        return response.status(200).json({ category:category });
    }

    async findById(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const category = await this.categoryService.findById(id);
        return response.status(200).json({ category:category });
    }

    // IMPORT CATEGORIES
    async handleImport(request: Request, response: Response): Promise<Response>{
        const { file } = request;
        //const deleteImport = true;
        await this.categoryService.executeImportCategory(file);
        return response.send();
    }

}

export { CategoryController };