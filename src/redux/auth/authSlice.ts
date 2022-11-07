import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type AuthState = {
  value: boolean;
};

const initialState: AuthState = {
  value: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const getAuthValue = (state: RootState) => state.auth.value;

export default authSlice.reducer;
