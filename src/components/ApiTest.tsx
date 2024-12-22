import { useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export function ApiTest() {
  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Testing API connection to:', API_URL);
        const response = await axios.get(`${API_URL}/api/test`);
        console.log('API test successful:', response.data);
      } catch (error) {
        console.error('API test failed:', error);
      }
    };

    testApi();
  }, []);

  return null;
} 