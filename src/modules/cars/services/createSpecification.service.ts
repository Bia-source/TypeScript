import { ISpecificationRepository } from "../interfaces/ISpecificationRepository";
import { Specification } from "../entities/specification.model";


interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
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

   findById(id: string): Specification{
    const specification = this.specificationRepository.findById(id);
    return specification;
   }

   listSpecification(): Specification[]{
       const specification = this.specificationRepository.list();
       return specification;
   }
}

export { CreateSpecificationService };