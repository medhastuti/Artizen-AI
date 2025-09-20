const axios = require('axios');
require('dotenv').config();

// Debug log for API key
console.log('API Key available:', !!process.env.OPENAI_API_KEY);

const apiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
  }
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  response => {
    console.log('API Response Success:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

module.exports = apiClient;
