// themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {StyleSheet, useColorScheme} from 'react-native';
interface ThemeState {
  theme: 'light' | 'dark';
}

const initialState: ThemeState = {
  theme: 'light', // Default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemes: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setThemes } = themeSlice.actions;
export default themeSlice.reducer;
