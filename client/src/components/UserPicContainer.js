import React from 'react';

const UserPicContainer = ({ pic, isOnline, className = 'w-12 h-12' }) => {
  return (
    <div className="relative">
      <div className={`${className} rounded-full overflow-hidden`}>
        <img
          className="object-cover w-12 h-12 object-center"
          src={pic}
          alt=""
        />
      </div>
      {isOnline && (
        <div className="absolute w-[13px] h-[13px] border-2 border-white bg-green-light right-0 bottom-0 rounded-full"></div>
      )}
    </div>
  );
};

export default UserPicContainer;
