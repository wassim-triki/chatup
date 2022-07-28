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
      className={` w-48 p-2 dropdown text-sm  ${
        isDark ? 'bg-dark-90 text-white ' : 'text-gray-dark'
      }`}
    >
      {items.map(({ icon, label, handleClick }, idx) => (
        <>
          {idx == items.length - 1 && (
            <div
              className={`h-[1px] bg-gray-200 ${
                isDark && 'bg-dark-80'
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
      {/* <div
        className={`hover:bg-gray-100 rounded-lg p-2 flex items-center gap-1 ${
          isDark && 'hover:bg-dark-80'
        }`}
      >
        <BiUserCircle className="text-lg" />
        Profile
      </div>
      <div
        onClick={toggleDarkMode}
        className="hover:bg-gray-100 rounded-lg p-2 flex items-center gap-1"
      >
        <CgDarkMode className="text-lg" />
        Dark Mode
      </div>
      <div className="h-[1px] w-full bg-gray-200 my-2"></div>
      <div onClick={handleLogout} className="hover:bg-gray-100 rounded-lg p-2">
        Logout
      </div> */}
    </div>
  );
};

export default UserMenu;
