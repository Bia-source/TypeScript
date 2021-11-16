import { Router } from 'express';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { SpecificationController } from '../modules/cars/controllers/specificationController';

const specificationRoutes = Router();
const specificationController = new SpecificationController();

specificationRoutes.use(ensureAuthenticate);
specificationRoutes.post("/", specificationController.handleCreateSpecification);
specificationRoutes.get("/",specificationController.handleListSpecification);
specificationRoutes.get("/", specificationController.findByName);
specificationRoutes.get("/:id", specificationController.findById);
specificationRoutes.put("/", specificationController.handleUpdateSpecification);

export { specificationRoutes };