import { ICreateSpecificationDTO } from "../interfaces/ISpecificationRepository";
import { Specification } from "../entities/specification.model";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { ValidateProps } from "../../../providers/validateProps";

@EntityRepository()
class SpecificationRepository {
   private repository: Repository<Specification>

   public constructor(){
       this.repository = getRepository(Specification);
   }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        this.validateSpecification("Já existe uma categoria com esse nome", name);
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
    
    async updateSpecification(name?: string, description?: string, id?: string): Promise<Specification>{
        this.validateSpecification("Essa especificação não foi encontrada", name);
        const specification = await this.repository.findOne({ id });
        let newSpecification = {
            name: name || specification.name,
            description: description || specification.description
        }
        await this.repository.update(id, newSpecification);
        const changeSpecification = this.repository.findOne({ id });
        return changeSpecification;
    } 

    private validateSpecification(messageError: string, data: string) {
        const validate = new ValidateProps();
        let specificationAlreadyExists = validate.validateAlreadyExistsSpecification(data);
        if(!specificationAlreadyExists) {
            throw new Error(`${messageError}`);
        }
    }
    
}



export { SpecificationRepository };