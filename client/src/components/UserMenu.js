import React from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { CgDarkMode } from 'react-icons/cg';
import { toast } from 'react-toastify';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import useAuth from '../context/UserContext/UserState';
import fetchData from '../helpers/fetchData';
import UserMenuItem from './UserMenuItem';

const UserMenu = ({ myRef }) => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { logoutUser } = useAuth();
  const handleLogout = async () => {
    const resp = await fetchData('/auth/logout');
    const { data, message: error } = resp;
    data && toast(data.message, { type: 'success' });
    logoutUser();
  };
  const items = [
    { label: 'Profile', icon: BiUserCircle },
    {
      label: 'Dark Mode',
      icon: CgDarkMode,
      handleClick: toggleDarkMode,
    },
    {
      label: 'Logout',
      handleClick: handleLogout,
    },
  ];

  return (
    <div
      ref={myRef}
      className={` z-50 w-48 p-2 dropdown text-xs md:text-base ${
        isDark ? 'bg-dark-90 text-white ' : 'text-gray-dark'
      }`}
    >
      {items.map(({ icon, label, handleClick }, idx) => (
        <>
          {idx == items.length - 1 && (
            <div
              className={`h-[1px]  ${
                isDark ? 'bg-dark-80' : 'bg-gray-200'
              } w-full my-2`}
            ></div>
          )}
          <UserMenuItem
            key={idx}
            Icon={icon}
            label={label}
            handleClick={handleClick}
          />
        </>
      ))}
    </div>
  );
};

export default UserMenu;
