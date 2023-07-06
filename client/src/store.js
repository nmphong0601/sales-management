import { configureStore } from '@reduxjs/toolkit';

import auth from './reducers/auth';
import user from './reducers/user';

const store = configureStore({
  reducer: {
    auth,
    user,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
export default store;
