import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv"
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const openai = new OpenAI({ 
    apiKey: process.env.API_KEY,
    baseURL:"https://generativelanguage.googleapis.com/v1beta/openai/"
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });

     // Add bot reply to conversation
    conversation.push({
      role: "model",
      parts: [{ text: botReply }],
    });

    res.json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
