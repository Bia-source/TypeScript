import { ICreateSpecificationDTO, ISpecificationRepository } from "../interfaces/ISpecificationRepository";
import { Specification } from "../model/specification.model";



class SpecificationRepository implements ISpecificationRepository{
    private specifications: Specification[] = [];
    
    private static INSTANCE: SpecificationRepository;

    private constructor(){
        this.specifications = [];
    }

    public static getIntance(): SpecificationRepository{
        if(!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
      }
    
    create({ name, description }: ICreateSpecificationDTO): void {
        const createdSpecification: Specification = new Specification();
        Object.assign(createdSpecification, {
            name,
            description,
            create_at: new Date()
        })

        this.specifications.push(createdSpecification);
    }

    findByName(name: string): Specification {
       const specification = this.specifications.find(res => res.name === name);
       return specification;
    }

    findById(id: string): Specification {
        const specification = this.specifications.find(res => res.id === id);
        return specification;
    }

    list(): Specification[]{
        return this.specifications;
     }
    
}

export { SpecificationRepository };