import { createSlice } from "@reduxjs/toolkit";


const failedEditSlice = createSlice({
    name: 'list',
    initialState: {
        items : []
    },
    reducers:{
        editItem: (state,action) => {
            state.items.push(action.payload);
        }
    }
});

export const { addItem , removeItem, clearItem } = failedEditSlice.actions;

export default failedEditSlice.reducer;
