import { Router } from "express";


const router=Router();

router.get("/schemes",getSchemes);
router.get("/schemes/:id",getSchemeById);

export default router;