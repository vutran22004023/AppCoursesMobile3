// useThemeStorage.ts
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useColorScheme } from 'react-native';

export const useThemeStorage = () => {
  const colorScheme = useColorScheme();
  const themes = useSelector((state: any) => state.theme.theme);

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    if(themes === 'system') {
      setTheme((colorScheme as 'light' | 'dark'))
    }else {
      setTheme((themes as 'light' | 'dark'));
    }
  }, [themes,colorScheme]);


  return { theme, setTheme };
};
