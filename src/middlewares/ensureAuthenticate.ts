import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/accounts/repositories/UserRepository";
import { AppError } from "../shared/Error/AppError";
import { MESSAGE_ERROR } from "../shared/Error/messagesError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next:NextFunction) {
    const authToken = request.headers.authorization;

    if(!authToken) {
       return response.status(400).json({
            error: MESSAGE_ERROR.TOKEN_INVALID
        });
    }
    
    const [, token ] = authToken.split(" ");
    
    try {
        const { sub } = verify(token, process.env.TOKEN_KEY) as IPayload;
        const repository = new UserRepository();
        const user = await repository.findById(sub);
        if(!user) {
            throw new AppError(`${MESSAGE_ERROR.USER_NO_EXISTS}`, 401);
        }
        request.user_id = sub;
        request.name = user.name;
        request.email = user.email;
        return next();

    } catch (error) {
        throw new AppError(`${MESSAGE_ERROR.TOKEN_INVALID}`, 401);
    }

}