import { Specification } from "../../entities/specification.model";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../interfaces/ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository{

    specification: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            description: description,
            name: name
        });
        await this.specification.push(specification);
        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return await this.specification.find(specification => specification.name === name);
    }
    async findById(id: string): Promise<Specification> {
        return await this.specification.find(specification => specification.id === id);
    }
    async list(): Promise<Specification[]> {
        return this.specification;
    }
    async updateSpecification(name: string, description: string, id: string): Promise<Specification> {
        const specificationIndex = await this.specification.findIndex(specification => specification.id === id);
        const specification = await this.specification.find(specification => specification.id === id);
        Object.assign(specification, {
            name: name,
            description: description
        });
        const res = this.specification[specificationIndex] = specification;
        return res;
    }

}

export { SpecificationRepositoryInMemory }