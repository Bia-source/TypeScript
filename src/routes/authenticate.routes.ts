import Router from "express";
import { AuthenticateController } from "../modules/accounts/authenticate/AuthenticateController";

const authenticateRoutes = Router();
const authenticateController = new AuthenticateController();

authenticateRoutes.post("/sessions", authenticateController.handle);

export { authenticateRoutes }