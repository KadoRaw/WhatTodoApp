import { createSlice } from '@reduxjs/toolkit';

export interface Auth {
  isLogin: boolean;
  username: string;
}

const initialState: Auth = {
  isLogin: false,
  username: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.username = action.payload.username;
    },
    logout: (state) => {
      document.cookie = 'token= ; path=/; Max-Age=-99999999;';
      state.isLogin = false;
      state.username = '';
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
