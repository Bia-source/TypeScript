import { Router } from "express";
import { categoriesRoutes } from "./categoties.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specification", specificationRoutes);
router.use("/user", usersRoutes);

export { router }