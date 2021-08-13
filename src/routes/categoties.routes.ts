import {  Router } from 'express';
import multer from 'multer';
import { CategoryController } from '../modules/cars/controllers/categoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();
const upload = multer({
    dest: "./temp"
});

// TODO passar o parametro por query params
categoriesRoutes.get("/name", categoryController.filterByName);
categoriesRoutes.post("/", categoryController.handleCreateCategory);
categoriesRoutes.get("/", categoryController.handleListCategory);
categoriesRoutes.get("/:id",categoryController.findById);
categoriesRoutes.post("/import", upload.single("file"), categoryController.handleImport);

export { categoriesRoutes };