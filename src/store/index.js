import { configureStore } from '@reduxjs/toolkit';
import verificationReducer from './Auth';
import themeReducer from './theme';
const store = configureStore({
  reducer: {
    verification: verificationReducer,
    theme: themeReducer,
  },
});

export default store;