import { Router } from "express";
import { BrowseCategory, checkEligibilty, searchSchemes ,getSchemeById} from "../controllers/scheme.controller";

const router=Router();

router.get("/schemes",BrowseCategory);

router.get("/schemes/search",searchSchemes);

router.post("/schemes/checkeligibilty",checkEligibilty);

router.get("/schemes/:id",getSchemeById);

export default router;