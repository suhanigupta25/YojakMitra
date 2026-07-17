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
    console.error("GEMINI_API_KEY is not set. /aiassistant will fail.");
}
const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/aiassistant", async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ error: "A non-empty 'message' string is required" });
    }

    try {
        const keywords = message.split(/\s+/).filter((w) => w.length > 3).slice(0, 6);
        const relevantSchemes = keywords.length
            ? await scheme
                  .find({
                      $or: keywords.map((k) => ({
                          $or: [
                              { name: { $regex: k, $options: "i" } },
                              { description: { $regex: k, $options: "i" } },
                              { category: { $regex: k, $options: "i" } },
                          ],
                      })),
                  })
                  .limit(15)
            : await scheme.find().limit(15);

        const schemeContext = relevantSchemes
            .map(
                (s: any) =>
                    `- ${s.name} | Category: ${s.category} | Eligibility: ${s.eligibility} | Age: ${s.age} | Gender: ${s.gender} | Income Limit: ${s.incomeLimit} | State: ${s.state}`
            )
            .join("\n");

        const response = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                maxOutputTokens: 800,
                systemInstruction: `
                    You are YojnaMitra AI, a government schemes advisor.
                    Only recommend schemes from the list below — never invent a scheme name or detail
                    that isn't in this list. If nothing in the list fits the user's situation, say so
                    plainly instead of guessing.

                        Available schemes:
                        ${schemeContext || "No matching schemes found in the database."}

                        Evaluate the user's profile, regional context, and financial situation, and
                        recommend from the list above. Be professional, encouraging, clear, and direct.
                                        `,
            },
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to generate content from AI pipeline" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure AI Backend runner live on port ${PORT}`));

export default app;