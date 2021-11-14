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
      return await this.userRepository.getUser(name, email);
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

    async validateAlreadyExistsSpecification(name: string): Promise<Specification>{
        return await this.specificationRepository.findByName(name);
    }


}

export { ValidateProps }