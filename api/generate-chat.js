const handler = async (req, res) => {
  const { messages } = req.body;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GENAI_API}`, // Use Gemini API key here
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemini-2.0-flash",  // use the Gemini model name
      messages,                  // same message format as OpenAI
      temperature: 0.8,
      max_tokens: 200,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(response.status).json({ error });
  }

  const data = await response.json();
  res.status(200).json(data);
};

module.exports = handler;
