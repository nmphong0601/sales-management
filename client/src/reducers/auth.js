import { createSlice } from '@reduxjs/toolkit';
import { login } from 'actions/authActions';

const initialState = {
  userInfor: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.fulfilled, (state, action) => {
      state.userInfor = action.payload;
      localStorage.setItem('userInfor', JSON.stringify(state.userInfor));
    });
  },
});
const reducer = authReducer.reducer;
export default reducer;
