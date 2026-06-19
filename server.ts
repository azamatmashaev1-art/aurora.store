import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Chatbot Stream API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are a customer support agent for a premium, high-end e-commerce brand. Be extremely polite, concise, and helpful. You help users find premium products, track orders, and assist with their shopping.",
          tools: [{ googleSearch: {} }]
        },
      });

      const responseStream = await chat.sendMessageStream({ message });
      
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, size } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: size || "1K"
          }
        }
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
        }
      }
      res.json({ imageUrl });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Intelligent Search using Flash-lite for low latency API
  app.post("/api/ai-search", async (req, res) => {
    try {
      const { query } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `Given the user search query: "${query}", suggest 3 categorized search terms for a premium household and personal care e-commerce store. Return as a JSON array of strings only. Example: ["Luxury Shampoos", "Organic Baby Care", "Eco-friendly Detergents"]`,
        config: {
            responseMimeType: "application/json"
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
