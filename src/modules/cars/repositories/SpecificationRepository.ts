import { ICreateSpecificationDTO } from "../interfaces/ISpecificationRepository";
import { Specification } from "../entities/specification.model";
import { EntityRepository, getRepository, Repository } from "typeorm";


@EntityRepository()
class SpecificationRepository {
     private repository: Repository<Specification>

   public constructor(){
       this.repository = getRepository(Specification);
   }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const createdSpecification = await this.repository.create({
            name,
            description
        })
        await this.repository.save(createdSpecification);
        return createdSpecification;
    }

    async findByName(name: string): Promise<Specification> {
        const specificationName = await this.repository.findOne({ name });
       return specificationName;
    }

    async findById(id: string): Promise<Specification> {
        const specificationID = await this.repository.findOne({ id });
        return specificationID;
    }

    async list(): Promise<Specification[]>{
        return await this.repository.find();
     }
    
}

export { SpecificationRepository };