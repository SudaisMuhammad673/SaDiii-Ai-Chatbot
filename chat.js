// Vercel serverless function: Gemini API key stays on the server.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing its Gemini API key. Add GEMINI_API_KEY in Vercel project settings." });
  }

  try {
    const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const messages = incoming
      .filter((item) =>
        item &&
        (item.role === "user" || item.role === "model") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0
      )
      .slice(-12);

    if (!messages.length) {
      return res.status(400).json({ error: "Please enter a message." });
    }

    const contents = messages.map((item) => ({
      role: item.role,
      parts: [{ text: item.content.slice(0, 6000) }]
    }));

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: "You are SaDiii AI, a helpful, friendly, accurate assistant created by Muhammad Sudais. Answer clearly and naturally. Help with general knowledge, programming, AI, study questions, and explanations. If you are unsure, say so."
            }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200
          }
        })
      }
    );

    const result = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API error:", result);
      return res.status(502).json({
        error: result.error?.message || "Gemini API request failed. Check your API key and AI Studio access."
      });
    }

    const reply = result.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!reply) {
      return res.status(502).json({ error: "Gemini returned an empty response. Please try again." });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat function error:", error);
    return res.status(500).json({ error: "Unexpected server error. Please try again." });
  }
}
