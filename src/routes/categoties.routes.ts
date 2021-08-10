import {  Router } from 'express';
import multer from 'multer';
import { CategoryController } from '../modules/cars/controllers/categoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();
const upload = multer({
    dest: "./temp"
});


categoriesRoutes.post("/", (request, response)=>{
    categoryController.handleCreateCategory(request,response); 
    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response)=>{
    const listCategories = categoryController.handleListCategory(request,response);
    return response.json({ listCategories });
});

// TODO passar o parametro por query params
categoriesRoutes.get("/name", (request, response)=>{
    const category = categoryController.filterByName(request, response);
    return response.json({ category });
});

categoriesRoutes.get("/:id", (request, response)=>{
    const category = categoryController.findById(request,response);
    return response.json({ category }); 
});

categoriesRoutes.post("/import", upload.single("file"),(request, response)=>{
//    const { file } = request;
//    console.log(file);
   //return response.send();
   return categoryController.handleImport(request, response);
})
export { categoriesRoutes };