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
        let userValidate = await validate.validateAlreadyExistsUser(name,email);
        if(userValidate) {
            throw new Error(`Já existe um usuario com esse ${userValidate.type}`);
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