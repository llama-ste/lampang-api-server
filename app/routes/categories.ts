import { Router } from "express";
import passport from "passport";
import { catrgoryControllers } from "../controllers";

const router = Router();

router
  .get("/", catrgoryControllers.getCategories)
  .get("/:categoryId/products", catrgoryControllers.getCategoryInProducts)
  .post(
    "/",
    passport.authenticate("jwt", { session: false }),
    catrgoryControllers.createCategory
  )
  .patch(
    "/order",
    passport.authenticate("jwt", { session: false }),
    catrgoryControllers.updateCategoryOrder
  )
  .patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    catrgoryControllers.updateCategory
  )
  .delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    catrgoryControllers.deleteCatrgory
  );

export default router;
