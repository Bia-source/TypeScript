import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const categoriesRoutes = Router();

const categoriesController = new CategoryController();
categoriesRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;
    const categoryAlreadyExists = categoriesController.findByName(name);
    if(categoryAlreadyExists){
        return response.status(400).json({ error: "categoria já existe"});
    }

    categoriesController.create({name, description});
    return response.status(200).json();
});

categoriesRoutes.get("/", (request, response)=>{
    const listCategories = categoriesController.getList();
    return response.status(200).json({ listCategories });
})

export { categoriesRoutes };