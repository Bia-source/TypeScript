import { ISpecificationRepository } from "../interfaces/ISpecificationRepository";
import { Specification } from "../entities/specification.model";
import { inject, injectable } from "tsyringe";


interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationService {
   
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository) {
    }
    
    async execute({ name, description }: IRequest): Promise<Specification>{
     
     const specificationAlereadyExist = await this.specificationRepository.findByName(name);
     
     if(specificationAlereadyExist){
        throw new Error("Specification already exist!");
     }
    const newSpecification = await this.specificationRepository.create({ name, description });
    return newSpecification;
   }

   async findByName(name:string): Promise<Specification>{
       const specification = await this.specificationRepository.findByName(name);
       return specification;
   }

   async findById(id: string): Promise<Specification>{
    const specification = await this.specificationRepository.findById(id);
    return specification;
   }

   async listSpecification(): Promise<Specification[]>{
       const specification = await this.specificationRepository.list();
       return specification;
   }
    
    async updateSpecification(name?: string, description?: string, id?: string): Promise<Specification>{
        const specification = await this.specificationRepository.updateSpecification({ name, description }, id);
        return specification;
   }
}

export { CreateSpecificationService };