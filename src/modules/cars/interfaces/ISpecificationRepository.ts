import { Specification } from "../entities/specification.model";

interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationRepository{
   create({name, description}: ICreateSpecificationDTO):void;
   findByName(name:string):Specification;
   findById(id: string): Specification;
   list(): Specification[];
}

export { ISpecificationRepository, ICreateSpecificationDTO };