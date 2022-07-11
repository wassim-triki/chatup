import axios from '../api/axiosConfig';
import React from 'react';
import { toast } from 'react-toastify';
import useAuth from '../context/UserContext/UserState';
const NotificationItem = ({ _id, picture, firstName, lastName }) => {
  const { acceptRequest, acceptedRequest } = useAuth();
  const { auth } = useAuth();
  const handleAccept = async (e) => {
    try {
      const resp = await axios.put('/users/acceptRequest', { id: _id });
      toast(resp.data.message, { type: 'success' });
      acceptRequest(_id);
      acceptedRequest();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={_id}
      className="w-[300px] flex flex-col gap-2  font-fira hover:bg-gray-100 rounded-xl p-2"
    >
      <div className="flex items-start gap-2">
        <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden ">
          <img className="object-cover object-center" src={picture} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <p className="font-medium inline">
              {firstName + ' ' + lastName + ' '}
            </p>
            <p className="inline text-sm text-gray-default">
              sent you a friend request.
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-1 justify-end items-center">
        <button className="btn-notif bg-green-dark" onClick={handleAccept}>
          Accept
        </button>
        <button className="btn-notif bg-gray-400">Decline</button>
      </div>
    </div>
  );
};

export default NotificationItem;
