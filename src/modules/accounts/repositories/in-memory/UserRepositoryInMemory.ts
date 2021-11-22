import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IReturnGetUser } from "../../dtos/IReturnGetUserDTO";
import { User } from "../../entities/User";
import { IUserRepositories } from "../../interfaces/IUsersRepositories";

class UserRepositoryInMemory implements IUserRepositories{
   
    users: User[] = [];

    async create(data: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            data
        })
        await this.users.push(user); 
        return user;
    }

    async getUser(name?: string, email?: string): Promise<IReturnGetUser> {
        // const userName = await this.user.find(user => user.name === name);
        // const userEmail = await this.user.find(user => user.email === email); 
        return;
    }

    async findByName(name: string): Promise<User> {
        return await this.users.find(user => user.name === name);
    }
    async findById(id: string): Promise<User> {
        return await this.users.find(user => user.id === id);
    }
    async findByEmail(email: string): Promise<User> {
        console.log(this.users);
        console.log("aqui", this.users.filter(res => res.email != email));
        return await this.users.filter(res => res.email != email)[0]; 
    }

}

export { UserRepositoryInMemory }