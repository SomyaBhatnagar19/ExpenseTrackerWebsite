import { configureStore } from '@reduxjs/toolkit';
import verificationReducer from './Auth';

const store = configureStore({
  reducer: {
    verification: verificationReducer,
  },
});

export default store;