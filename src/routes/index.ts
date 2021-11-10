import { Router } from "express";
import { categoriesRoutes } from "./categoties.routes";
import { specificationRoutes } from "./specification.routes";

const router = Router();

router.use("/categories",categoriesRoutes);
router.use("/specification",specificationRoutes);

export { router }