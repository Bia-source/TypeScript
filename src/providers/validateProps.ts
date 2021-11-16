import { inject, injectable } from "tsyringe"
import { Category } from "../modules/cars/entities/category.model"
import { Specification } from "../modules/cars/entities/specification.model"
import { ICategoriesRepository } from "../modules/cars/interfaces/ICategoriesRepository"
import { ISpecificationRepository } from "../modules/cars/interfaces/ISpecificationRepository"
import { IUserRepositories } from "../modules/accounts/interfaces/IUsersRepositories"

class ValidateProps{
    constructor(
        @inject("UserRepository")
        private userRepository?: IUserRepositories,
        @inject("CategoryRepositories")
        private categoryRepository?: ICategoriesRepository,
        @inject("SpecificationRepository")
        private specificationRepository?: ISpecificationRepository
    ) { }
    
    // Revisar essa Validação, Não esta funcionando 
    async validateAlreadyExistsUser(name?: string, email?: string): Promise<any> {
        
         await this.userRepository.getUser(name, null);
         //await this.userRepository.getUser(null,email);
    }

    async validateAlreadyExistsSpecification(name?: string, id?: string): Promise<Specification>{
        let resultSpecification;
        const specificationName = await this.specificationRepository.findByName(name);
        const specificationId = await this.specificationRepository.findById(id);

        if(specificationId) {
            resultSpecification = specificationId;
        }
        if(specificationName) {
            resultSpecification = specificationName;
        }
        return resultSpecification;
    }

    async validateAlreadyExixtsCategory(name?: string, id?: string): Promise<Category>{
        let category: Category;
        if(id) {
            let idCategory = await this.categoryRepository.findById(id);
            category = idCategory;
        }
        
        if(name) {
            let nameCategory = await this.categoryRepository.findByName(name);
            category = nameCategory;
        }

        return category;
    }

}

export { ValidateProps }