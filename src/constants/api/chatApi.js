import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export async function post({ request }) {
  const { messages } = await request.json();

  const response = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  });

  return new Response(JSON.stringify({ response: response.choices[0].message.content }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
