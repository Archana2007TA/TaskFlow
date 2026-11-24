import { useCallback, useEffect, useState } from 'react';
import {
  loadThemeFromStorage,
  saveThemeToStorage,
  ThemeMode,
} from '../utils/storage';

/**
 * Custom hook managing light and dark mode on the root HTML element.
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => loadThemeFromStorage());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveThemeToStorage(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  };
}
