import { Request, Response } from 'express';
import { CreateSpecificationService } from '../services/createSpecification.service';
import { container } from "tsyringe";

class SpecificationController{
   
   async handleCreateSpecification(request: Request, response: Response): Promise<Response> {
       const { name, description } = request.body;
       const specificationService = container.resolve(CreateSpecificationService);
       const specification = await specificationService.execute({name, description});
       return response.status(201).json(specification);
    }

   async filterByName(request: Request, response: Response): Promise<Response>{
       const { name } = request.body;
       const specificationService = container.resolve(CreateSpecificationService);
       const specification = await specificationService.findByName(name);
       return response.status(200).json(specification); 
    }

   async filterById(request: Request, response: Response): Promise<Response>{
      const { id } = request.params;
      const specificationService = container.resolve(CreateSpecificationService);
      const specification = await specificationService.findById(id);
      return response.status(200).json(specification);
    }   

    async handleListSpecification(request: Request, response: Response): Promise<Response>{
     const specificationService = container.resolve(CreateSpecificationService);
     const list = await specificationService.listSpecification();
     return response.status(200).json({list})
    }

    async handleUpdateSpecification(request: Request, response: Response): Promise<Response> { 
        const { name, description } = request.body;
        const { id } = request.params;
        const specificationService = container.resolve(CreateSpecificationService);
        const specificationUpdate = specificationService.updateSpecification(name, description, id);
        return response.status(200).json(specificationUpdate);
    }
}

export { SpecificationController };