import axios from 'axios';

// Base URL for Django backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || 'https://garmently-backend.vercel.app/api'
  : 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const apiService = {
  // Test connection to backend
  testConnection: async () => {
    try {
      const response = await api.get('/hello/');
      return response.data;
    } catch (error) {
      console.error('Error testing connection:', error);
      throw error;
    }
  },

  // Get API status
  getStatus: async () => {
    try {
      const response = await api.get('/status/');
      return response.data;
    } catch (error) {
      console.error('Error getting status:', error);
      throw error;
    }
  },

  // Get all garments
  getGarments: async () => {
    try {
      const response = await api.get('/garments/');
      return response.data;
    } catch (error) {
      console.error('Error fetching garments:', error);
      throw error;
    }
  },

  // Create new garment
  createGarment: async (garmentData: any) => {
    try {
      const response = await api.post('/garments/', garmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating garment:', error);
      throw error;
    }
  },
};

export default apiService;