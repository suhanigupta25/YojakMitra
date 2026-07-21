import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";

// Ensure dotenv is loaded here as well
dotenv.config();

console.log("DEBUG GEMINI KEY:", process.env.GEMINI_API_KEY ? "KEY EXISTS" : "KEY IS MISSING/UNDEFINED");

export const aiClient = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY
});