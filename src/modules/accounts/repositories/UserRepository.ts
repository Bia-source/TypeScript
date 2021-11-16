import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IReturnGetUser } from "../dtos/IReturnGetUserDTO";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";
import { MESSAGE_ERROR } from "../../../shared/Error/messagesError";

@EntityRepository()
class UserRepository implements IUserRepositories{
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async filterByEmail(email: string): Promise<User> {
        return await this.repository.findOne({
              where: {
                email: email
              }
        });
    }
    async filterByName(name: string): Promise<User> {
        return await this.repository.findOne({
              where: {
                name: name
              }
        });
    }
    async filterById(id: string): Promise<User> {
       return await this.repository.findOne({
            where: {
                id: id
            }
        });
    }
    
    async getUser(name?: string, email?: string): Promise<IReturnGetUser> {
        let user: IReturnGetUser;
        const userName = await this.filterByName(name);
        const userEmail = await this.filterByEmail(email);
        //const userId = await this.filterById(id);
        if(userName) {
            user = {
                user: userName,
                type: "name"
            };
        }

        if(userEmail) {
            user = {
                user: userEmail,
                type: "email"
            };
        }

        // if(userId) {
        //     user = {
        //         user: userId,
        //         type: "id"
        //     };
        // }
        return user;
    }

    async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<User> {
        await this.validateUser("create",name, null);    
        await this.validateUser("create", null, email);
        const user = await this.repository.create({
            name,
            email,
            password,
            driver_license
        });
        const saveUser = await this.repository.save(user);
        return saveUser;
    }

    private async validateUser(method: string, name?: string, email?: string) {
        let userAlreadyExistsName = await this.getUser(name, null);
        let userAlreadyExistsEmail = await this.getUser(null,email);
        if(userAlreadyExistsEmail && method === "create") {
            throw new Error(MESSAGE_ERROR.VALIDATE_USER_EMAIL);
        }
        if(userAlreadyExistsName && method === "create") {
            throw new Error(MESSAGE_ERROR.VALIDATE_USER_NAME);
        }
    }
}

export { UserRepository }