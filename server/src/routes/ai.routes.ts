import { Router } from "express";
import { handleAiAssistant, handleCompareSchemes } from "../controllers/ai.controller";

const aiRouter = Router();

aiRouter.post("/aiassistant", handleAiAssistant);
aiRouter.post("/schemes/compare", handleCompareSchemes);

export default aiRouter;