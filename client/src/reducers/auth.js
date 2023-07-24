import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from 'actions/authActions';

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
      if (state.userInfor) {
        localStorage.setItem('userInfor', JSON.stringify(state.userInfor));
      }
        
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem('userInfor');
    });
  },
});
const reducer = authReducer.reducer;
export default reducer;
