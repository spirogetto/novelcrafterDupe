export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = JSON.parse(req.body);
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemma-3-27b-it:free", // You can change this to any model ID
        "messages": [
          { "role": "user", "content": message }
        ]
      })
    });

    const data = await response.json();
    
    // OpenRouter follows the OpenAI response format
    const botReply = data.choices[0].message.content;
    
    res.status(200).json({ reply: botReply });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to OpenRouter" });
  }
}
