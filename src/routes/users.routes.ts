import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "../modules/accounts/controllers/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/controllers/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { GetUserController } from "../modules/accounts/controllers/GetUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./temp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const getUserController = new GetUserController();

usersRoutes.get("/", getUserController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticate, uploadAvatar.single("avatar"), updateUserAvatarController.handle);


export { usersRoutes }