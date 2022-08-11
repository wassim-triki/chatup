import React from 'react';
import useDarkMode from '../context/DarkModeContext/DarkModeState';

const UserMenuItem = ({ Icon, label, handleClick }) => {
  const { isDark } = useDarkMode();
  return (
    <div
      onClick={handleClick}
      className={` rounded-lg p-2 flex items-center gap-1 ${
        isDark ? 'hover:bg-dark-80' : 'hover:bg-gray-100'
      }`}
    >
      {Icon && <Icon className="text-lg" />}

      {label}
    </div>
  );
};

export default UserMenuItem;
