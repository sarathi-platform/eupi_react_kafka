import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatusData = createAsyncThunk(
  'status/fetchStatusData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://uat.eupi-sarthi.in/sync-server/sync/eventsByStatus');
      console.log('API Response:', response.data);
      return response.data;
    } catch (err) {
      console.error('Full Error:', err); // Log the full error object for more details
      if (!err.response) {
        console.error('Network or other error:', err.message); // Log a more specific message for network errors
        return rejectWithValue({ message: 'Network Error' });
      }
      console.error('API Error:', err.response.data); // Log the error response data
      return rejectWithValue(err.response.data);
    }
  }
);

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    data: null, 
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatusData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatusData.fulfilled, (state, action) => {
        state.data = action.payload; // Update the data
        state.loading = false;
        state.fetched = true;
      })
      .addCase(fetchStatusData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error occurred';
      });
  },
});


export default statusSlice.reducer;
