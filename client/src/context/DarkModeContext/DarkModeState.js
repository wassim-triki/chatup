import { useContext, useState } from 'react';
import DarkModeContext from './DarkModeContext';

export const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem('isDark')) || false
  );
  const toggleDarkMode = () => {
    localStorage.setItem('isDark', !isDark);
    setIsDark((isDark) => !isDark);
  };
  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => useContext(DarkModeContext);
export default useDarkMode;
