import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: true,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      console.log('action.payload: ', action.payload);
      state.sidebar = action.payload;
      console.log('state: ', state.sidebar);
    },
  },
});

export const { toggleSidebar } = layoutSlice.actions;

export default layoutSlice.reducer;
