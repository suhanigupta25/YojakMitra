import { Type } from "@google/genai";
import { aiClient } from "../config/ai";
import scheme from "../models/Scheme";

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export class AiService {
  
  static async getAssistantReply(message: string): Promise<string> {
    const keywords = Array.from(
      new Set(message.toLowerCase().split(/\s+/).filter((w) => w.length > 3))
    ).slice(0, 6);

    let relevantSchemes = [];

    if (keywords.length > 0) {
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
              `- ${s.name} | Category: ${s.category || "N/A"} | Eligibility: ${s.eligibility || "N/A"} | State: ${s.state || "N/A"}`
          )
          .join("\n")
      : "No matching schemes found in the database.";

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        maxOutputTokens: 800,
        systemInstruction: `You are YojnaMitra AI. Only recommend from this list:\n${schemeContext}`,
      },
    });

    return response.text || "No response generated.";
  }


  static async compareSchemes(schemes: any[]): Promise<any> {
    const comparisonContext = schemes
      .map(
        (s: any) =>
          `Scheme: ${s.name}\n- Category: ${s.category}\n- Eligibility: ${s.eligibility}\n- Key Specs: ${s.incomeLimit || "None"}`
      )
      .join("\n\n");

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Compare these government schemes objectively:\n\n${comparisonContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            criteria: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  feature: { type: Type.STRING },
                  values: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["feature", "values"],
              },
            },
            recommendation: { type: Type.STRING },
          },
          required: ["criteria", "recommendation"],
        },
      },
    });

    return JSON.parse(response.text || "{}");
  }
}