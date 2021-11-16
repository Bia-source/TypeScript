import { Request, Response } from "express";
import { AuthenticateService } from "./AuthenticateService";
import { container } from "tsyringe";

class AuthenticateController {
     async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        try {
            const authenticateService = container.resolve(AuthenticateService);
            const authUser = await authenticateService.execute({ email, password });
             return response.json({ authUser });
        } catch (error) {
             return response.json({ error: error.message });
        }
     }
}

export { AuthenticateController }