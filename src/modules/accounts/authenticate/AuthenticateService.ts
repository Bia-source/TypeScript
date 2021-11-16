import { IUserRepositories } from "../interfaces/IUsersRepositories";
import { inject, injectable } from "tsyringe";
import { MESSAGE_ERROR } from "../../../shared/Error/messagesError";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"
import { classToPlain } from "class-transformer";
import { AppError } from "../../../shared/Error/AppError";

interface IRequest {
    email: string;
    password: string;
}

@injectable()
 class AuthenticateService {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepositories) {  
    }
    
    async execute({email, password}: IRequest): Promise<Object> {
         const user = await this.userRepository.findByEmail(email);
         if(!user) {
             throw new AppError(MESSAGE_ERROR.AUTHENTICATE_USER);
         }

        const passwordMacth = await compare(password, user.password)
        if(!passwordMacth) {
            throw new AppError(MESSAGE_ERROR.AUTHENTICATE_USER);
        }


        const token = sign({}, `${process.env.TOKEN_KEY}`, {
            subject: user.id,
            expiresIn: "1d"
        });
        
        return { user: classToPlain(user), token: token}    
    }
}

export { AuthenticateService }
