import { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import MessagesForm from './MessagesForm';

const Chat = () => {
  const { auth } = useAuth();
  const [chat, setChat] = useState(auth.caht);
  useEffect(() => {
    setChat(auth.chat);
  }, [auth]);
  return (
    <div className="box p-0 font-fira items-stretch">
      {chat ? (
        <>
          <div className=" p-2 border-b-2 border-b-gray-100">
            <div className="flex items-center h-full gap-2">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  className="h-12 w-12 object-cover object-center"
                  src={chat?.receiver.picture}
                  alt=""
                />
              </div>
              <div>
                <p>
                  {chat?.receiver.firstName} {chat?.receiver.lastName}
                </p>
                <p className="text-gray-default text-sm">last seen</p>
              </div>
            </div>
          </div>
          <div className="p-4 mt-auto items-stretch ">
            <MessagesForm />
          </div>
        </>
      ) : (
        'no active chat'
      )}
    </div>
  );
};

export default Chat;
