import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client with correct user-agent telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { messages, attachment } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "API Key is not configured. Please add GEMINI_API_KEY in the Secrets panel.",
        },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload. 'messages' array is required." },
        { status: 400 }
      );
    }

    // Format conversation history for Gemini API
    const systemInstruction = `You are the Official AI Assistant of the "Rizky Smart Community" (RSC), a premium, futuristic technology community created by Muhammad Rizky.
Muhammad Rizky is a brilliant computer science student born on April 12, 2006, from Cadek, Aceh Besar, currently in his 4th semester heading into 5th semester at Universitas Bina Bangsa Getsempena (BBG).
Your purpose is to assist community members with programming, AI, digital technology, siber security, IoT, UI/UX, and RSC platform navigation.
Be extremely polite, professional, high-tech, inspiring, and direct. Use Indonesian primarily as requested, but you can respond in English if asked.
Never reveal security keys or break character. Keep your answers engaging and formatted elegantly with markdown.`;

    // Extract last message and build simple chat format
    let lastUserMessage = messages[messages.length - 1]?.content || "";
    
    // Support basic chat history formatting
    const historyParts = messages.slice(0, -1).map((m: any) => {
      return `${m.role === "user" ? "User" : "Model"}: ${m.content}`;
    });

    let prompt = historyParts.length > 0 
      ? `Here is our conversation history:\n${historyParts.join("\n")}\n\nUser: ${lastUserMessage}`
      : lastUserMessage;

    // Handle text attachment by injecting into prompt
    if (attachment && attachment.type === "text") {
      prompt = `[Lampiran Berkas: ${attachment.name}]\n\`\`\`\n${attachment.data}\n\`\`\`\n\n${prompt}`;
    }

    let response;

    // If there's an image attachment, send multi-modal request
    if (attachment && attachment.type === "image") {
      const imagePart = {
        inlineData: {
          mimeType: attachment.mimeType,
          data: attachment.data, // base64 encoded data
        },
      };
      const textPart = {
        text: prompt,
      };
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
    } else {
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
    }

    const replyText = response.text || "I apologize, but I could not formulate a response at the moment.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during content generation." },
      { status: 500 }
    );
  }
}
