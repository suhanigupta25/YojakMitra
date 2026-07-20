import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/scheme.route";
import { GoogleGenAI } from "@google/genai";
import scheme from "./models/Scheme";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("YojnaMitra Backend Running");
});

app.use(router);

if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is not set. /aiassistant endpoints will fail.");
}

const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

app.post("/aiassistant", async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "A non-empty 'message' string is required" });
    }

    try {
        const keywords = Array.from(
            new Set(
                message
                    .toLowerCase()
                    .split(/\s+/)
                    .filter((w) => w.length > 3)
            )
        ).slice(0, 6);

        let relevantSchemes = [];

        if (keywords.length > 0) {
            // Match any scheme where ANY keyword hits name, description, or category
            const searchConditions = keywords.flatMap((k) => {
                const safeKeyword = escapeRegex(k);
                return [
                    { name: { $regex: safeKeyword, $options: "i" } },
                    { description: { $regex: safeKeyword, $options: "i" } },
                    { category: { $regex: safeKeyword, $options: "i" } },
                ];
            });

            relevantSchemes = await scheme.find({ $or: searchConditions }).limit(15);
        } else {
            relevantSchemes = await scheme.find().limit(15);
        }

        const schemeContext = relevantSchemes.length
            ? relevantSchemes
                  .map(
                      (s: any) =>
                          `- ${s.name} | Category: ${s.category || "N/A"} | Eligibility: ${s.eligibility || "N/A"} | Age: ${s.age || "N/A"} | Gender: ${s.gender || "N/A"} | Income Limit: ${s.incomeLimit || "N/A"} | State: ${s.state || "N/A"}`
                  )
                  .join("\n")
            : "No matching schemes found in the database.";

        const response = await aiClient.models.generateContent({
            model: "gemini-2.0-flash", // Correct model name
            contents: message,
            config: {
                maxOutputTokens: 800,
                systemInstruction: `
You are YojnaMitra AI, an expert advisor for Indian government schemes.

Strict Rules:
1. ONLY recommend schemes listed under "Available schemes" below.
2. NEVER invent, extrapolate, or mention scheme names/details outside this provided context.
3. If no matching or suitable schemes are in the list, state clearly: "I couldn't find any directly matching schemes in our database based on your details."
4. Evaluate the user's situation against eligibility criteria (Age, Gender, Income, State).

Available schemes:
${schemeContext}
                `,
            },
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to generate AI recommendation." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`YojnaMitra AI Backend running on port ${PORT}`));

export default app;