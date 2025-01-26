import { configureStore } from '@reduxjs/toolkit';
import celebrityRequestReducer from './celebrityRequestSlice';

const store = configureStore({
  reducer: {
    celebrityRequest: celebrityRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
