import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from 'services/authServices';

export const login = createAsyncThunk('auth/login', async (loginInfo) => {
  const response = await AuthServices.login(loginInfo);
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await AuthServices.logout();
  return response.data;
});
