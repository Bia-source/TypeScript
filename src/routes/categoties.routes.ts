import { Router } from 'express';
import { Category } from '../model/category.model';
const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;
    const createdCategory: Category = new Category();
    //primeiro parametro o objeto e o segundo o que quero colocar dentro dele
    Object.assign(createdCategory, {
        name,
        description, 
        created_at: new Date()
    })
    // const category: Category = {
    //     
    // };

    // const data = { ...createdCategory, ...category}
    
    categories.push(createdCategory);
    return response.status(200).json({ createdCategory });

})

export { categoriesRoutes };