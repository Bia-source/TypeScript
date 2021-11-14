import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";

@injectable()
class CreateUserService{

    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepositories
    ) { }
    async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<User> {
      const user = await this.usersRepository.create({
            name,
            password,
            email,
            driver_license
        }); 
        return user;
    }

}

export { CreateUserService }