import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IReturnGetUser } from "../dtos/IReturnGetUserDTO";
import { User } from "../entities/User";

interface IUserRepositories{
    create(data: ICreateUserDTO): Promise<User>;
    getUser(name?: string, email?: string): Promise<IReturnGetUser>;
    findByName(name: string): Promise<User>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUserRepositories }