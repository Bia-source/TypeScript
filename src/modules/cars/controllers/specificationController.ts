import { Request, Response } from 'express';
import { SpecificationRepository } from '../repositories/SpecificationRepository';
import { CreateSpecificationService } from '../services/createSpecification.service';

class SpecificationController{
   private specificationRepository = SpecificationRepository.getIntance();
   private specificationService = new CreateSpecificationService(this.specificationRepository);

   handleCreateSpecification(request: Request, response: Response){
       const { name, description } = request.body;
       this.specificationService.execute({name, description});
       return response.status(201).json(this.specificationService);
   }

   filterByName(request: Request, response: Response): Response{
       const { name } = request.body;
       this.specificationService.findByName(name);
       return response.status(200).json(this.specificationService); 
      }

   filterById(request: Request, response: Response): Response{
      const { id } = request.params;
      this.specificationService.findById(id);
      return response.status(200).json(this.specificationService);
   }   

   handleListSpecification(request: Request, response: Response): Response{
    const list = this.specificationService.listSpecification();
    return response.status(200).json({list})
    
   }
}

export { SpecificationController };