const apiClient = require('../apiClient');

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const formattedPrompt = `
Write a short professional artist bio for the given prompt. 
Prompt: ${prompt}

Each line shouldn't exceed 10 words.
Use third person point of view. Structure the bio in concise bullet points, 
each separated by creative and relevant hashtags. 
Highlight the artist's style 🖌️, preferred mediums 🎨, key themes 💭, 
and impact or recognition 🌍. Keep the tone imaginative, fresh, engaging ✨ and funny. 
Use expressive and artistic hashtags.
`;

  try {
    const response = await apiClient.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: formattedPrompt }],
        temperature: 0.8,
        max_tokens: 200,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const bio = response.data.choices[0].message.content.trim();
    return res.status(200).json({ bio });
  } catch (error) {
    console.error('Artist Bio Error:', error.message);
    return res.status(500).json({ error: 'Failed to generate artist bio' });
  }
};

module.exports = handler;
