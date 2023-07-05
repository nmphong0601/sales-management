import { createAsyncThunk } from '@reduxjs/toolkit';
import UserServices from 'services/userServices';

export const findItems = createAsyncThunk('user/findItems', async () => {
  const response = await UserServices.all();
  return response.data;
});

export const pagedItems = createAsyncThunk(
  'user/pagedItems',
  async (pagingInfor) => {
    const response = await UserServices.paged(pagingInfor);
    return response.data;
  }
);

export const findItem = createAsyncThunk('user/findItem', async (id) => {
  const response = await UserServices.single(id);
  return response.data;
});

export const addItem = createAsyncThunk('user/addItem', async (item) => {
  const response = await UserServices.create(item);
  return response.data;
});

export const updateItem = createAsyncThunk('user/updateItem', async (item) => {
  const response = await UserServices.update(item.Id, item);
  return response.data;
});

export const removeItem = createAsyncThunk('user/removeItem', async (id) => {
  const response = await UserServices.delete(id);
  return response.data;
});

export const login = createAsyncThunk('user/login', async (loginInfo) => {
  const response = await UserServices.login(loginInfo);
  return response.data;
});
