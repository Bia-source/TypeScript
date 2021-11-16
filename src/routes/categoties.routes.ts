import {  Router } from 'express';
import multer from 'multer';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { CategoryController } from '../modules/cars/controllers/categoryController';

const categoriesRoutes = Router();
const categoryController = new CategoryController();
const upload = multer({
    dest: "./temp"
});

// TODO passar o parametro por query params
categoriesRoutes.use(ensureAuthenticate);
categoriesRoutes.get("/name", categoryController.findByName);
categoriesRoutes.post("/", categoryController.handleCreateCategory);
categoriesRoutes.get("/", categoryController.handleListCategory);
categoriesRoutes.get("/:id",categoryController.findById);
categoriesRoutes.post("/import", upload.single("file"), categoryController.handleImport);
categoriesRoutes.put("/", categoryController.handleUpdateCategory);

export { categoriesRoutes };