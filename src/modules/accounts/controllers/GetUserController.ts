import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserService } from "../services/GetUsersService";

class GetUserController{
    async handle(req: Request, res: Response): Promise<Response>{
        const { email } = req.body;
        try {
            const userService = container.resolve(GetUserService);
            const user = await userService.execute(email);
            return res.json({
            user: user
            });
        } catch (error) {
            return res.json({
                message: error.message
            });
        }
   }
}

export { GetUserController }