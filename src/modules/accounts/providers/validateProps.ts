import { inject } from "tsyringe"
import { Category } from "../../cars/entities/category.model"
import { Specification } from "../../cars/entities/specification.model"
import { ICategoriesRepository } from "../../cars/interfaces/ICategoriesRepository"
import { ISpecificationRepository } from "../../cars/interfaces/ISpecificationRepository"
import { User } from "../entities/User"
import { IUserRepositories } from "../interfaces/IUsersRepositories"

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

    async validateAlreadyExixtsCategory(nameOrId: string): Promise<Category>{
        let category;
        const idCategory = await this.categoryRepository.findById(nameOrId);
        const nameCategory = await this.categoryRepository.findByName(nameOrId);
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