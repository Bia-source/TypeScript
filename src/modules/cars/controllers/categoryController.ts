import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { container } from "tsyringe";
class CategoryController{
   
    async handleCreateCategory(request: Request, response: Response): Promise<Response>{
        const { name, description } = request.body;
        try {
            const categoryService = container.resolve(CategoryService);
            const category = await categoryService.execute({ name, description});
            return response.status(201).json({category:category});
        } catch (error) {
            return response.json({ error: error.message });
        }
        
    }

    async handleListCategory(request: Request, response: Response): Promise<Response>{
       const categoryService = container.resolve(CategoryService);
       const listCategories = await categoryService.list();
       return response.status(200).json({ listCategories:listCategories });
    }

    async filterByName(request: Request, response: Response): Promise<Response>{
        const { name } = request.body;
        const categoryService = container.resolve(CategoryService);
        const category = await categoryService.findByName(name);
        return response.status(200).json({ category:category });
    }

    async findById(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const categoryService = container.resolve(CategoryService);
        const category = await categoryService.findById(id);
        return response.status(200).json({ category:category });
    }

    // IMPORT CATEGORIES
    async handleImport(request: Request, response: Response): Promise<Response>{
        const { file } = request;
        //const deleteImport = true;
        const categoryService = container.resolve(CategoryService);
        await categoryService.executeImportCategory(file);
        return response.send();
    }

    async handleUpdateCategory(request: Request, response: Response): Promise<Response>{
        const { name, description, id } = request.body;
        try {
            const categoryService = container.resolve(CategoryService);
            const categoryUpdate = await categoryService.updateCategory(name, description, id);
            return response.status(200).json({ category: categoryUpdate });
        } catch (error) {
            return response.json({ error: error.message });
        }
        
    }
}

export { CategoryController };