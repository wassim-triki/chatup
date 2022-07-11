import React, { useEffect } from 'react';
import dateToTime from '../helpers/dateToTime';
import truncateStr from '../helpers/truncateStr';

const ContactItem = ({
  _id,
  firstName,
  lastName,
  picture,
  lastDate,
  lastMessage,
  isOnline,
}) => {
  return (
    <div
      className={`flex gap-3 justify-between cursor-pointer relative hover:bg-gray-100 p-3 mb-2 last-of-type:mb-0 rounded-2xl self-stretch`}
    >
      <div className="relative w-min self-start ">
        <div className="w-12 h-12 rounded-full overflow-hidden ">
          <img className="object-cover object-center" src={picture} alt="" />
        </div>
        {isOnline && (
          <div className="absolute w-[13px] h-[13px] border-2 border-white bg-green-light right-0 bottom-0 rounded-full"></div>
        )}
      </div>
      <div
        className={` flex flex-col flex-1 font-fira gap-1 whitespace-nowrap`}
      >
        <div className="text-gray-dark text-lg font-normal ">
          {firstName + ' ' + lastName}
        </div>

        <p className="text-[14px] text-gray-default">
          {!truncateStr(lastMessage, 25) && ''}
        </p>
      </div>
      <div className="font-medium text-sm text-gray-dark">
        {!dateToTime(lastDate) && ''}
      </div>
    </div>
  );
};

export default ContactItem;
