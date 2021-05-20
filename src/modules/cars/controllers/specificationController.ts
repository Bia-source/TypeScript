import { Request, Response } from 'express';
import { SpecificationRepository } from '../repositories/SpecificationRepository';
import { CreateSpecificationService } from '../services/createSpecification.service';

class SpecificationController{

   handleCreateSpecification(request: Request, response: Response){
       const { name, description } = request.body;
       const specificationRepository = new SpecificationRepository();
       const specificationService = new CreateSpecificationService(specificationRepository);
       specificationService.execute({name, description});
       return response.status(201).json(specificationService);
   }

   filterByName(request: Request, response: Response): Response{
       const { name } = request.body;
       const specificationRepository = new SpecificationRepository();
       const specificationService = new CreateSpecificationService(specificationRepository);
       specificationService.findByName(name);
       console.log(specificationService);
       return response.status(200).json(specificationService); 
      }

   filterById(request: Request, response: Response): Response{
      const { id } = request.params;
      const specificationRepository = new SpecificationRepository();
      const specificationService = new CreateSpecificationService(specificationRepository);
      specificationService.findById(id);
      console.log(specificationService);
      return response.status(200).json(specificationService);
   }   
}

export { SpecificationController };