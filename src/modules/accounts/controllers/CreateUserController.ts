import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController{

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, username, password, email, driver_license } = request.body;
        const createUserService = container.resolve(CreateUserService);
        const newUser = await createUserService.execute({
            name,
            username,
            password,
            email,
            driver_license
        });
        return response.status(201).json({ user: newUser });
        
    }
}

export { CreateUserController }