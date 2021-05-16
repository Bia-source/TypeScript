import { ISpecificationRepository } from "../interfaces/ISpecificationRepository";
import { Specification } from "../model/specification.model";


interface IRequest {
    name: string;
    description: string;
}

class createSpecificationService {
   constructor(private specificationRepository: ISpecificationRepository){
   }
    execute({ name, description}: IRequest): void{
     const specificationAlereadyExist = this.specificationRepository.findByName(name);
     if(specificationAlereadyExist){
        throw new Error("Specification already exist!");
     }
     this.specificationRepository.create({name, description});
   }

   findByName(name:string): Specification{
       const specification = this.specificationRepository.findByName(name);
       return specification;
   }
}

export { createSpecificationService };