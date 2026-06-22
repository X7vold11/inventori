import { createContext, useContext, useState, useEffect } from 'react';
import { themes } from './themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children, initialTheme = 'blue' }) => {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const themeConfig = themes[currentTheme] || themes.blue;

  useEffect(() => {
    setCurrentTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    const variables = themeConfig.variables || {};
    Object.entries(variables).forEach(([name, val]) => {
      document.documentElement.style.setProperty(name, val);
    });
  }, [themeConfig]);

  const value = {
    theme: currentTheme,
    themeConfig,
    setTheme: setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
