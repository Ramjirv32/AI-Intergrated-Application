import axios from 'axios';

const API_URL = 'https://api-inference.huggingface.co/models/salesforce/codegen-350M-multi';
const API_KEY = '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'; 

export const generateCode = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      inputs: prompt,
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;  // Rethrow the error for handling in the calling function
  }
};
