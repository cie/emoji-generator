import express from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
app.get("/api/getemoji", async (req, res) => {
  const text = String(req.query.text).slice(0, 500);
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    temperature: 0,
    messages: [
      { role: "developer", content: "Generate an emoji from the text: " },
      { role: "user", content: text },
    ],
  });
  res.send(response.choices[0].message.content);
});
app.use(express.static("./public"));
export default app;
