import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController{

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, email, driver_license } = request.body;
        try {
            const createUserService = container.resolve(CreateUserService);
            const newUser = await createUserService.execute({
            name,
            password,
            email,
            driver_license
            });
            return response.status(201).json({ user: newUser });
        } catch (error) {
            response.status(400).json({ error: error.message }); 
        }
        
    }
}

export { CreateUserController }