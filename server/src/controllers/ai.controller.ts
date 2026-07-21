import { Request, Response } from "express";
import { AiService } from "../services/ai.service";

export const handleAiAssistant = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "A non-empty 'message' string is required" });
  }

  try {
    const reply = await AiService.getAssistantReply(message);
    return res.json({ reply });
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return res.status(500).json({ error: "Failed to generate AI response." });
  }
};

export const handleCompareSchemes = async (req: Request, res: Response) => {
  const { schemes } = req.body;

  if (!schemes || !Array.isArray(schemes) || schemes.length < 2) {
    return res.status(400).json({ error: "At least two schemes are required for comparison." });
  }

  try {
    const comparisonResult = await AiService.compareSchemes(schemes);
    return res.json(comparisonResult);
  } catch (error: any) {
    console.error("Comparison Error:", error);

    if (error?.status === 429 || error?.message?.includes("Quota exceeded")) {
      return res.status(429).json({
        error: "AI rate limit reached. Please wait a minute and try again.",
      });
    }

    return res.status(500).json({ error: "Failed to generate AI comparison." });
  }
};