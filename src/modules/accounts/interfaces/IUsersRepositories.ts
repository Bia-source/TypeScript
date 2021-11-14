import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IReturnGetUser } from "../dtos/IReturnGetUserDTO";
import { User } from "../entities/User";

interface IUserRepositories{
    create(data: ICreateUserDTO): Promise<User>;
    getUser(name: string, email: string): Promise<IReturnGetUser>;
}

export { IUserRepositories }