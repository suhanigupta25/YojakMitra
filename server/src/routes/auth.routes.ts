import { Router } from "express";
import { login, signup ,getProfile} from "../controllers/auth.controller";
import {restrictToAuth} from "../middleware/auth.middleware"

const router = Router();

router.post("/login", login);
router.post("/signup", signup);

router.get('/profile',restrictToAuth,getProfile);

export default router;