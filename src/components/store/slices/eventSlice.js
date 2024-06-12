// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_TOKEN = 'skjfwefkjrwfrw';

// export const fetchEventData = createAsyncThunk(
//   'events/fetchEventData',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('https://dev.eupi-sarthi.in/sync-server/sync/getEventsByStatus', payload, {
//         headers: {
//           'Authorization': `Bearer ${API_TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       return response.data;
//     } catch (err) {
//       if (!err.response) {
//         return rejectWithValue({ message: 'Network Error' });
//       }
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const eventSlice = createSlice({
//   name: 'events',
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEventData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEventData.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchEventData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'An unexpected error occurred';
//       });
//   },
// });

// export default eventSlice.reducer;
