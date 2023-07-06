import { createSlice } from '@reduxjs/toolkit';
import {
  findItems,
  findItem,
  pagedItems,
  addItem,
  updateItem,
  removeItem,
} from 'actions/userActions';

const initialState = {
  items: [],
  item: null,
  pagingInfor: {
    page: 1,
    pageSize: 10,
    search: '',
    params: [],
    totalItems: 10,
  },
  userInfor: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(findItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(findItem.fulfilled, (state, action) => {
      state.item = action.payload;
    });
    builder.addCase(pagedItems.fulfilled, (state, action) => {
      state.pagingInfor =
        action.payload?.pagingInfor || initialState.pagingInfor;
      state.items = action.payload?.items || initialState.items;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
const reducer = userReducer.reducer;
export default reducer;
