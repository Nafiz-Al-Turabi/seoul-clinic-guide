// src/app/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
}

const initialState: AuthState = {
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    clearEmail(state) {
      state.email = "";
    },
  },
});

export const { setEmail, clearEmail } = authSlice.actions;
export default authSlice.reducer;
