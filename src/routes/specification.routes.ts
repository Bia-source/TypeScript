import { request, response, Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { createSpecificationService } from "../modules/cars/services/createSpecification.service";



const specificationRoutes = Router();

const specificationRepository = new SpecificationRepository();
specificationRoutes.post("/", (request,response)=>{
    const { name, description } = request.body;
    const specificationService = new createSpecificationService(specificationRepository);
    specificationService.execute({name, description});
    return response.status(201).json({message: "Especificação inserida com sucesso"});
});

specificationRoutes.get("/", (request,response)=>{
    const { name } = request.body;
    const specification = new createSpecificationService(specificationRepository);
    specification.findByName(name);
    return response.status(200).json(specification);
});

export { specificationRoutes };