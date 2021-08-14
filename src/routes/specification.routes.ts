import { Router } from 'express';
import { SpecificationController } from '../modules/cars/controllers/specificationController';

const specificationRoutes = Router();
const specificationController = new SpecificationController();

specificationRoutes.post("/", specificationController.handleCreateSpecification);
specificationRoutes.get("/",specificationController.handleListSpecification);
specificationRoutes.get("/", specificationController.filterByName);
specificationRoutes.get("/:id", specificationController.filterById);
specificationRoutes.put("/:id", specificationController.handleUpdateSpecification);

export { specificationRoutes };