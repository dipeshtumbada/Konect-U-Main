import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import Groq from 'groq-sdk';

const app = express();
const port = 80;  // Port 80 for HTTP

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('Received messages:', messages); // Log the messages received

  try {
    const response = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages,
    });

    console.log('Groq API response:', response); // Log the response from Groq API

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
