import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface AuthState {
  user: User | null;
  access_token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  access_token: localStorage.getItem('token'),
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user:User ; access_token: string }>) => {
      console.log("sdsdu",action.payload.access_token)
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.access_token);
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer; 