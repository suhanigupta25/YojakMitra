import { Router } from "express";
import { login, signup ,getProfile} from "../controllers/auth.controller";
import {restrictToAuth} from "../middleware/auth.middleware"

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);

authRouter.get('/profile',restrictToAuth,getProfile);

export default authRouter;