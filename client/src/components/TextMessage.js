import React from 'react';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import useAuth from '../context/UserContext/UserState';

const TextMessage = ({ sender, content }) => {
  const { auth } = useAuth();
  const { isDark } = useDarkMode();
  return (
    <div
      className={`flex text-sm items-center justify-center ${
        sender === auth.user._id ? 'self-end' : 'self-start'
      }  min-w-[70px]  p-4 rounded-xl bg-gray-light break-all hyphens-auto  font-light  ${
        sender === auth.user._id
          ? 'rounded-tr-none bg-indigo-default text-white'
          : isDark
          ? 'rounded-tl-none text-white bg-dark-80'
          : 'rounded-tl-none text-gray-dark'
      }`}
    >
      {content}
    </div>
  );
};

export default TextMessage;
