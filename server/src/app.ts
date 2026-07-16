import express from "express";
import cors from "cors";
import router from "./routes/scheme.route"
const { GoogleGenAI } = require('@google/genai');

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("YojnaMitra Backend Running");
});

app.use(router); 

const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/aiassistant', async (req, res) => {
    const { message } = req.body;
    
    try {
        // Calling the operational model directly with the text frame
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,

            config: {
                systemInstruction: `
                    You are YojnaMitra AI, an expert structural government schemes advisor. 
                    Your job is to evaluate the user's personal profile, regional context, and financial requirements naturally. 
                    Be professional, encouraging, clear, and direct. Only recommend legitimate 
                    schemes that match their specific details. Do not hallucinate programs.Please be precise.
                `
            }
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: "Failed to generate content from AI pipeline" });
    }
});

app.listen(5000, () => console.log('Secure AI Backend runner live on port 5000'));

export default app;