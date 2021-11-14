import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";

@EntityRepository()
class UserRepository implements IUserRepositories{
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
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