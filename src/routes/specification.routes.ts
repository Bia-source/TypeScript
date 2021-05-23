import { Router } from 'express';
import { SpecificationController } from '../modules/cars/controllers/specificationController';

const specificationRoutes = Router();
const specificationController = new SpecificationController();

specificationRoutes.post("/", (request, response)=>{
    specificationController.handleCreateSpecification(request, response);
    return response.status(201).send();
});

specificationRoutes.get("/", (request, response)=>{
    const listCategories = specificationController.handleListSpecification(request,response);
    return response.status(200).json({ listCategories });
});

specificationRoutes.get("/", (request, response)=>{
    const specification = specificationController.filterByName(request, response);
    return response.status(200).json({ specification });
});

specificationRoutes.get("/:id", (request, response)=>{
    const specification = specificationController.filterById(request, response);
    return response.status(200).json({ specification });
});
export { specificationRoutes };