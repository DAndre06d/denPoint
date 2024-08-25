import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', credentials, { withCredentials: true });

      if (response.status !== 200) {
        throw new Error(response.data.message || 'Failed to login');
      }

      return response.data;
    } catch (error) {
      // Check if error is from axios and if it is a 429 error
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        // Handle 429 error specifically
        return thunkAPI.rejectWithValue('Too many requests. Please try again later.');
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);