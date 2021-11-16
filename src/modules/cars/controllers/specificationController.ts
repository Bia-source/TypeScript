import { Request, Response } from 'express';
import { CreateSpecificationService } from '../services/createSpecification.service';
import { container } from "tsyringe";

class SpecificationController{
   
   async handleCreateSpecification(request: Request, response: Response): Promise<Response> {
       const { name, description } = request.body;
       try {
           const specificationService = container.resolve(CreateSpecificationService);
           const specification = await specificationService.execute({name, description});
           return response.status(201).json(specification);
       } catch (error) {
           return response.json({ error: error.message });
       }
       
    }

   async findByName(request: Request, response: Response): Promise<Response>{
       const { name } = request.body;
       try {
           const specificationService = container.resolve(CreateSpecificationService);
           const specification = await specificationService.findByName(name);
           return response.status(200).json(specification); 
       } catch (error) {
           return response.json({ error: error.message });
       }
    }

   async findById(request: Request, response: Response): Promise<Response>{
      const { id } = request.params;
      try {
          const specificationService = container.resolve(CreateSpecificationService);
          const specification = await specificationService.findById(id);
          return response.status(200).json(specification);
      } catch (error) {
          return response.json({ error: error.message });
      }
    }   

    async handleListSpecification(request: Request, response: Response): Promise<Response>{
     try {
         const specificationService = container.resolve(CreateSpecificationService);
         const list = await specificationService.listSpecification();
         return response.status(200).json({list})
     } catch (error) {
         return response.json({ error: error.message });
     }
    }

    async handleUpdateSpecification(request: Request, response: Response): Promise<Response> { 
        const { name, description, id } = request.body;
        try {
            const specificationService = container.resolve(CreateSpecificationService);
            const specificationUpdate = await specificationService.updateSpecification(name, description, id);
            return response.status(200).json(specificationUpdate);
        } catch (error) {
            return response.json({ error: error.message });
        }
        
    }
}

export { SpecificationController };