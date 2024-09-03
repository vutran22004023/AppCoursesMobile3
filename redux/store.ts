import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import userReducer from './Slide/userSlide'; // Adjust path as necessary
import timeReducer from './Slide/timeVideoSide'
// import playbackReducer from './Slide/playbackSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Define RootState
export type RootState = ReturnType<typeof rootReducer>;

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  timesVideo: timeReducer,
  // playback: playbackReducer,
  // Add other reducers as needed
});

// Configure persist options
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [], // Blacklist 'user' reducer from being persisted (if needed)
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store instance
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);