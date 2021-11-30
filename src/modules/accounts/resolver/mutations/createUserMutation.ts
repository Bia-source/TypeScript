import { container } from "tsyringe";
import { CreateUserService } from "../../services/CreateUserService";

export async function createUserMutation(name: string, email: string, password: string, driver_license: string, avatar_url: string): Promise<Object>{
    const createUserService = container.resolve(CreateUserService);
    return createUserService.execute({ name, email, password, driver_license, avatar_url });
}