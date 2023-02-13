import { Router } from "express";
import { authControllers } from "../controllers";

const router = Router();

router.post("/sign_in", authControllers.signIn);

export default router;
