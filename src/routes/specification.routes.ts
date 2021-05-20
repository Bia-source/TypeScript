import { Router } from 'express';
import { SpecificationController } from '../modules/cars/controllers/specificationController';
import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/createSpecification.service';

const specificationRoutes = Router();
const specificationController = new SpecificationController();
const specificationRepository = new SpecificationRepository();
const specificationService = new CreateSpecificationService(specificationRepository);

specificationRoutes.post("/", (request, response)=>{
    const { name, description } = request.body;
    specificationService.execute({ name, description});
    return response.status(201).json(specificationService);
});

specificationRoutes.get("/", (request, response)=>{
    const listCategories = specificationRepository.list();
    return response.status(200).json({ listCategories });
});

specificationRoutes.get("/", (request, response)=>{
    const res = specificationController.filterByName(request, response);
    return response.status(200).json(res);
});

specificationRoutes.get("/:id", (request, response)=>{
    const res = specificationController.filterById(request, response);
    return response.status(200).json(res);
});
export { specificationRoutes };