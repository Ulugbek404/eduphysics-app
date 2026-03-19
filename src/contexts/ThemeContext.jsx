import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Faqat dark tema CSS o'zgaruvchilari
function applyDarkTheme() {
  const root = document.documentElement;
  root.classList.remove('dark', 'light', 'black');
  root.classList.add('dark');

  const vars = {
    '--bg-primary': '#020617',
    '--bg-surface': '#0f172a',
    '--bg-card': '#1e293b',
    '--border-color': '#334155',
    '--text-primary': '#f8fafc',
    '--text-muted': '#94a3b8',
    '--accent': '#6366f1',
  };
  Object.entries(vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}

export const ThemeProvider = ({ children }) => {
  // Hozircha faqat dark tema
  const theme = 'dark';

  useEffect(() => {
    applyDarkTheme();
  }, []);

  // setTheme — kelajak uchun (hozir hech narsa o'zgartirmaydi)
  const setTheme = () => { };
  const toggleTheme = setTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
