import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiRouter = express.Router();

console.log("Key exists:", !!process.env.GEMINI_API_KEY);

aiRouter.post('/generate-text', async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent(prompt + '. Keep the response short and concise. Keep the text form plain, dont add bold or italics. You may add numbering and paragraph changes though.');
    const text = result.response.text();

    console.log(text);

    res.status(200).json({ text });
  } catch (error) {
    console.error("DEBUG AI ERROR:", error.stack || error);
    res.status(500).json({ error: error.message });
  }
});

export default aiRouter;