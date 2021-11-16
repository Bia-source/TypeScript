import { ICreateSpecificationDTO } from "../interfaces/ISpecificationRepository";
import { Specification } from "../entities/specification.model";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { ValidateProps } from "../../../providers/validateProps";
import { MESSAGE_ERROR } from "../../../shared/Error/messagesError";

@EntityRepository()
class SpecificationRepository {
   private repository: Repository<Specification>

   public constructor(){
       this.repository = getRepository(Specification);
   }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        this.validateSpecification(MESSAGE_ERROR.VALIDATE_SPECIFICATION_EXISTS, name, "create");
        const createdSpecification = await this.repository.create({
            name,
            description
        })
        await this.repository.save(createdSpecification);
        return createdSpecification;
    }

    async findByName(name: string): Promise<Specification> {
       const specificationName = await this.repository.findOne({ where: { name } });
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
        this.validateSpecification(MESSAGE_ERROR.VALIDATE_SPECIFICATION_NOT_FOUND, name, "update");
        const specification = await this.repository.findOne({ id });
        let newSpecification = {
            name: name || specification.name,
            description: description || specification.description
        }
        await this.repository.update(id, newSpecification);
        const changeSpecification = await this.repository.findOne({ id });
        return changeSpecification;
    } 

    private async validateSpecification(messageError: string, data: string, method: string) {
        const validate = new ValidateProps();
        let specificationAlreadyExists = await validate.validateAlreadyExistsSpecification(data);
        if(method === 'create' && specificationAlreadyExists) {
            throw new Error(`${messageError}`);
        }
        if(method === 'update' && !specificationAlreadyExists) {
            throw new Error(`${messageError}`);
        }
    }
    
}



export { SpecificationRepository };