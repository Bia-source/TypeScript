import { Specification } from "../entities/specification.model";

interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationRepository{
   create({name, description}: ICreateSpecificationDTO):Promise<Specification>;
   findByName(name:string):Promise<Specification>;
   findById(id: string): Promise<Specification>;
   list(): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };