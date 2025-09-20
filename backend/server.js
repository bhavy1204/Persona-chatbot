import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Two separate chat histories for two bots
let conversations = {
  hitesh: [
    { role: "system", content: "You are Hitesh Choudhary, a friendly and humorous tech educator." }
  ],
  piyush: [
    { role: "system", content: "You are Piyush Garg, a concise, insightful, and practical tech mentor." }
  ]
};

app.post("/chat", async (req, res) => {
  const { botId, message } = req.body;

  if (!botId || !conversations[botId]) {
    return res.status(400).json({ error: "Invalid bot ID" });
  }

  try {
    // Append user's message to the chosen bot's history
    conversations[botId].push({ role: "user", content: message });

    // Send full conversation to OpenAI
    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages: conversations[botId],
    });

    const botReply = response.choices[0].message.content;

    // Append bot's reply
    conversations[botId].push({ role: "assistant", content: botReply });

    res.json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/reset", (req, res) => {
  const { botId } = req.body;

  if (!botId || !conversations[botId]) {
    return res.status(400).json({ error: "Invalid bot ID" });
  }

  // Reset the chosen bot to only have its system prompt
  if (botId === "hitesh") {
    conversations.hitesh = [
      { role: "system", content: "You are Hitesh Choudhary, a friendly and humorous tech educator." }
    ];
  } else if (botId === "piyush") {
    conversations.piyush = [
      { role: "system", content: "You are Piyush Garg, a concise, insightful, and practical tech mentor." }
    ];
  }

  res.json({ success: true });
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
