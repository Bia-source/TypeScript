import { container } from "tsyringe";
import { User } from "../../entities/User";
import { GetUserService } from "../../services/GetUsersService";

export async function getUserByEmail(email): Promise<User> {
    const getUserService = await container.resolve(GetUserService);
    return getUserService.execute(email);
}