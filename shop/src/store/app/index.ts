import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  socket: null,
  cart: []
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: any) => {
      state.user = action.payload;
    },
    setCart:(state, action: any) => {
      state.cart=action.payload
    }
  },
});

export const { setUser,setCart } = appSlice.actions;

export default appSlice.reducer;
