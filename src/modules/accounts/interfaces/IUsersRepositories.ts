import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUserRepositories{
    create(data: ICreateUserDTO): Promise<User>;
    getUser(nameOrEmail: string): Promise<User>;
}

export { IUserRepositories }