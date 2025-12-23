
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Nettoie une chaîne de caractères pour extraire le JSON valide
 * Utile car les modèles LLM retournent parfois du Markdown ```json ... ```
 */
function cleanJsonMarkdown(text: string): string {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

/**
 * Recherche classique optimisée avec Google Search pour les conseils beauté
 */
export async function smartSearchBeauty(query: string, location?: string) {
  const ai = getAI();
  const locationContext = location ? ` située à ${location}` : "";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tu es l'expert beauté de la plateforme Glameo. Analyse cette tendance ou recherche : "${query}" pour une personne${locationContext}. 
      Réponds exclusivement en FRANÇAIS.
      Prends en compte les spécificités locales (climat, tendances de la région).
      Structure ta réponse pour aider un client à choisir son prochain style.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            trends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  vibe: { type: Type.STRING }
                }
              }
            },
            advice: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "trends", "advice"]
        }
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title,
      uri: chunk.web?.uri
    })).filter((s: any) => s.uri) || [];

    const rawText = response.text || "{}";
    const cleanedText = cleanJsonMarkdown(rawText);

    return {
      data: JSON.parse(cleanedText),
      sources
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    // Retourne un objet vide structuré pour éviter les erreurs de mapping UI
    return { 
      error: true, 
      message: "L'expert IA est temporairement indisponible.",
      data: { summary: "", trends: [], advice: [] } 
    };
  }
}

export async function editHairstyleImage(base64Image: string, prompt: string) {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Apply the following change to this hairstyle: ${prompt}. Return only the modified image.`,
          },
        ],
      },
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    throw new Error("Aucune image n'a été générée par l'IA.");
  } catch (error) {
    console.error("AI Image Edit Error:", error);
    throw error;
  }
}
