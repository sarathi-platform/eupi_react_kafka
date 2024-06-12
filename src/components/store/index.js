// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import statusSice from './slices/statusSice';
import  selectedDataSlice from './slices/selectedData';
import eventSlice from './slices/eventSlice';

const store = configureStore({
  reducer: {
    status: statusSice,
    selectedData: selectedDataSlice, // Make sure the key matches the slice name
    // events: eventSlice, // Add the new slice here
  },
});

export default store;
