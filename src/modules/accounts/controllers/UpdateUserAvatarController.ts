import { Request, Response } from "express";
import { container } from "tsyringe";
import { MESSAGE_ERROR } from "../../../shared/Error/messagesError";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";


class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request;
        const avatar_url_file = request.file.filename;
        try {
            const updateAvatarService = container.resolve(UpdateUserAvatarService);
            await updateAvatarService.execute({ user_id, avatar_url_file });
            return response.status(204).send();
        } catch(error) {
            if(error.message === MESSAGE_ERROR.VALIDATE_USER_NAME) {
               return response.status(204).send(); 
            }
            return response.json({
                error: error.message
            });
        }
    }
}

export { UpdateUserAvatarController }