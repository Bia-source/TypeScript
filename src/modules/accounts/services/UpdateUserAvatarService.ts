import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/Error/AppError";
import { MESSAGE_ERROR } from "../../../shared/Error/messagesError";
import { IUserRepositories } from "../interfaces/IUsersRepositories";

interface IRequest {
    user_id: string;
    avatar_url_file: string;
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepositories
    ){}

    async execute({ user_id, avatar_url_file}: IRequest): Promise<void> {
        const user = await this.userRepository.findById(user_id);
        if(!user) {
           throw new AppError(`${MESSAGE_ERROR.USER_NOT_FOUND}`) 
        }
        Object.assign(user, {
            avatar_url: avatar_url_file,
            method: 'upload'
        });

        await this.userRepository.create(user);
    }
}

export { UpdateUserAvatarService }