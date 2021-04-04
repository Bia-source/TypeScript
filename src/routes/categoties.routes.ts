import { Router } from 'express';
import { CategoryRepositories } from '../repositories/category.repository';

const categoriesRoutes = Router();

const categoriesReCategoryRepositories = new CategoryRepositories();
categoriesRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;
    const categoryAlreadyExists = categoriesReCategoryRepositories.findByName(name);
    if(categoryAlreadyExists){
        return response.status(400).json({ error: "categoria já existe"});
    }

    categoriesReCategoryRepositories.create({name, description});
    return response.status(200).json();
});

categoriesRoutes.get("/", (request, response)=>{
    const listCategories = categoriesReCategoryRepositories.getList();
    return response.status(200).json({ listCategories });
})

export { categoriesRoutes };