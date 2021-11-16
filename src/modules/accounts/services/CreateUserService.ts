import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";
import { hash } from "bcrypt";
import { MESSAGE_ERROR } from "../../../shared/Error/messagesError";
import { classToPlain } from "class-transformer";
@injectable()
class CreateUserService{

    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepositories
    ) { }
    async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<Object> {
        try {
            const passwordHash = await hash(password, 8);
            const user = await this.usersRepository.create({
              name,
              password: passwordHash,
              email,
              driver_license
            }); 

            return classToPlain(user);
        } catch (error) {
            throw new Error(MESSAGE_ERROR.CREATE_USER);
        }
        
    }
}

export { CreateUserService }