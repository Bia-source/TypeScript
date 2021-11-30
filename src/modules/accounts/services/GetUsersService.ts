import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import { IUserRepositories } from "../interfaces/IUsersRepositories";

@injectable()
class GetUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepositories
    ) { }
    
    async execute(email: string): Promise<User>{
        return await this.userRepository.findByEmail(email);
    }
}

export { GetUserService }