const apiClient = require('../apiClient');

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { product, audience, tone, platform, keywords } = req.body;

  if (!product || !audience || !tone || !platform) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const prompt = `
Generate a social media post and a catchy tagline.

Details:
- Product: ${product}
- Audience: ${audience}
- Tone: ${tone}
- Platform: ${platform}
- Keywords: ${keywords || 'N/A'}

Respond in this format:
Caption: <caption>
Tagline: <tagline>
`;

  try {
    const response = await apiClient.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
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

    const text = response.data.choices[0].message.content;

    const captionMatch = text.match(/Caption:\s*(.+)/i);
    const taglineMatch = text.match(/Tagline:\s*(.+)/i);

    return res.status(200).json({
      caption: captionMatch ? captionMatch[1].trim() : '',
      tagline: taglineMatch ? taglineMatch[1].trim() : '',
    });
  } catch (error) {
    console.error('Social Post Error:', error.message);
    return res.status(500).json({ error: 'Failed to generate social media post' });
  }
}

module.exports = handler;
