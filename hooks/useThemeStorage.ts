// useThemeStorage.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';
const THEME_KEY = '@theme_key';

export const useThemeStorage = () => {
  const colorScheme = useColorScheme();
  const themes = useSelector((state: any) => state.theme.theme);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setTheme((themes as 'light' | 'dark') || colorScheme);
  }, [themes]);

  const saveTheme = async (newTheme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to save theme to AsyncStorage', error);
    }
  };

  return { theme, setTheme: saveTheme };
};
