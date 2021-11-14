import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IReturnGetUser } from "../dtos/IReturnGetUserDTO";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";

@EntityRepository()
class UserRepository implements IUserRepositories{
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }
    async getUser(name?: string, email?: string): Promise<IReturnGetUser> {
        let user: IReturnGetUser;
        const userName = await this.repository.findOne({
            where: {
                name: name
            }
        });

        const userEmail = await this.repository.findOne({
            where: {
                email: email
            }
        });

        if(userName) {
            user = {
                user: userName,
                type: "name"
            };
            return user;
        }
        if(userEmail) {
            user = {
                user: userEmail,
                type: "email"
            };
            return user;
        }
    }

    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<User> {
        const user = await this.repository.create({
            name,
            email,
            password,
            driver_license
        });
        const saveUser = await this.repository.save(user);
        return saveUser;
    }


}

export { UserRepository }