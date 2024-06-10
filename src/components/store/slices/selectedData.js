import { createSlice } from '@reduxjs/toolkit';

export const selectedDataSlice = createSlice({
  name: 'selectedData',
  initialState: [],
  reducers: {
    addSelectedData: (state, action) => {
      const existingIndex = state.findIndex(data => data.id === action.payload.id);
      if (existingIndex === -1) {
        state.push(action.payload);
      } else {
        state.splice(existingIndex, 1);
        state.push(action.payload);
      }
    },
    removeSelectedData: (state, action) => {
      return state.filter(data => data.id !== action.payload.id);
    },
    clearSelectedData: (state) => {
      return [];
    },
    addBulkSelectedData: (state, action) => {
      action.payload.forEach(item => {
        const existingIndex = state.findIndex(data => data.id === item.id);
        if (existingIndex === -1) {
          state.push(item);
        } else {
          state.splice(existingIndex, 1);
          state.push(item);
        }
      });
    }
  },
});

export const { addSelectedData, removeSelectedData, clearSelectedData, addBulkSelectedData } = selectedDataSlice.actions;

export default selectedDataSlice.reducer;
