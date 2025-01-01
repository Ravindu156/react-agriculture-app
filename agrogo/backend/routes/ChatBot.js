const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/api/ask', async (req, res) => {
    const { userInput } = req.body; 
    if (!userInput) {
      return res.status(400).json({ error: 'User input is required' });
    }
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userInput }],
        },
        {
    
          headers: {
              'Authorization': `Bearer YOUR_API_KEY`,
              'Content-Type': 'application/json',
            },
        }
      );
  
      res.json({ response: response.data });
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
  });
  module.exports = router;