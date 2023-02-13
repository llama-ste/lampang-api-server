import { Router } from "express";
import passport from "passport";
import { productsControllers } from "../controllers";

const router = Router();

router
  .get("/", productsControllers.getProducts)
  .get(
    "/info/:url",
    passport.authenticate("jwt", { session: false }),
    productsControllers.getCoupangItem
  )
  .post(
    "/",
    passport.authenticate("jwt", { session: false }),
    productsControllers.createProduct
  )
  .patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    productsControllers.updateProduct
  )
  .delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    productsControllers.deleteProduct
  );

export default router;
