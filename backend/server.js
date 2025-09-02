import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set your API key in .env
});

// Generate AI Reply
async function generateReply(message) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",  // You can use "gpt-4o-mini" or "gpt-4o"
      messages: [{ role: "user", content: message }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    return "Sorry, I couldn’t process that right now.";
  }
}

// API Route
app.post("/api/chat", async (req, res) => {
  const { text } = req.body;
  const reply = await generateReply(text);
  res.json({ reply });
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
