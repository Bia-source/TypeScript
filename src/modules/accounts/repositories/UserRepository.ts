import { EntityRepository, getCustomRepository, getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IReturnGetUser } from "../dtos/IReturnGetUserDTO";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";
import { ValidateProps } from "../../../providers/validateProps";

interface IParamsValidate{
    name?: string;
    email?: string;
}
@EntityRepository()
class UserRepository implements IUserRepositories{
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }
    
    async getUser(name?: string, email?: string): Promise<IReturnGetUser> {
        let user: IReturnGetUser;
        if(name != null) {
           const userName = await this.repository.findOne({
              where: {
                name: name
              }
            });
            if(userName) {
              user = {
                user: userName,
                type: "name"
              };
            }
        } 
        if(email != null) {
            const userEmail = await this.repository.findOne({
            where: {
                email: email
            }
            });
            if(userEmail) {
              user = {
                user: userEmail,
                type: "email"
              };
            }
        }
        
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
        if(userAlreadyExistsEmail) {
            throw new Error("Esse email de usuario já existe, tente outro!");
        }
        if(userAlreadyExistsName) {
            throw new Error("Esse nome de usuario já existe, tente outro!");
        }
    }


}

export { UserRepository }