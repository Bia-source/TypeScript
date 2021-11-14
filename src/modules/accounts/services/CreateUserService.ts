import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";
import { hash } from "bcrypt";
import { ValidateProps } from "../providers/validateProps";
@injectable()
class CreateUserService{

    constructor(
        @inject("UserRepository")
        private usersRepository: IUserRepositories
    ) { }
    async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<User> {
        const validate = new ValidateProps(this.usersRepository);
        let userValidateName = await validate.validateAlreadyExistsUser(name);
        let userValidateEmail = await validate.validateAlreadyExistsUser(email);
        if(userValidateName) {
            throw new Error("Já existe um usuario com esse nome");
        }
        if(userValidateEmail) {
            throw new Error("Já existe um usuario com esse email");
        }
        const passwordHash = await hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license
        }); 
        return user;
    }
}

export { CreateUserService }