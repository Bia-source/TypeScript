import { inject } from "tsyringe"
import { Category } from "../modules/cars/entities/category.model"
import { Specification } from "../modules/cars/entities/specification.model"
import { ICategoriesRepository } from "../modules/cars/interfaces/ICategoriesRepository"
import { ISpecificationRepository } from "../modules/cars/interfaces/ISpecificationRepository"
import { User } from "../modules/accounts/entities/User"
import { IUserRepositories } from "../modules/accounts/interfaces/IUsersRepositories"

interface IReturnValidateUser{
    user: User;
    type: string;
}
class ValidateProps{
    constructor(
        @inject("UserRepository")
        private userRepository?: IUserRepositories,
        @inject("CategoryRepositories")
        private categoryRepository?: ICategoriesRepository,
        @inject("SpecificationRepository")
        private specificationRepository?: ISpecificationRepository
    ) { }
    

    async validateAlreadyExistsUser(name?: string, email?: string): Promise<IReturnValidateUser> {
        if(!name) {
          return await this.userRepository.getUser(null,email);
        } 
        if(!email) {
            return await this.userRepository.getUser(name,null);
        }
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
        let category;
        const idCategory = await this.categoryRepository.findById(id);
        const nameCategory = await this.categoryRepository.findByName(name);
        if(idCategory) {
            category = idCategory;
        }
        if(nameCategory) {
            category = nameCategory;
        }

        return category;
    }

}

export { ValidateProps }