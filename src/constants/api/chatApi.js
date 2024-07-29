import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
const port = process.env.GROQ_PORT || 5000; // Use GROQ_PORT from environment variable or default to 5000

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors({
  origin: 'https://konectu.in',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('Received messages:', messages); // Log the messages received

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages,
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null
    });

    let formattedResponse = '';

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      formattedResponse += content.replace(/\n/g, '\n\n');
    }

    console.log('Groq API response:', formattedResponse); // Log the formatted response

    res.json({ response: formattedResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Groq API Server is running on port ${port}`); // Corrected the backticks for string interpolation
});
