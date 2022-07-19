import React from 'react';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';

const Message = ({ _id, sender, createdAt, content, idx }) => {
  const { messages, openChat } = useChat();
  const { auth } = useAuth();
  return (
    <div
      className={`w-full   h-fit font-poppins flex ${
        sender === auth.user._id ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={` max-w-[80%] min-h-[70px] h-full flex min-w-[70px] gap-4 ${
          sender === auth.user._id && 'flex-row-reverse'
        }`}
      >
        <div
          className={`${
            sender === auth.user._id ? 'hidden' : 'w-10'
          } h-full flex flex-col items-center gap-1 `}
        >
          {sender != auth.user._id && (
            <>
              <div className="h-10 w-10 ">
                {!(messages[idx - 1]?.sender === sender) && (
                  <div className="h-full rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover object-center"
                      src={
                        openChat.chat.users[0]._id === sender
                          ? openChat.chat.users[0].picture
                          : openChat.chat.users[1].picture
                      }
                      alt=""
                    />
                  </div>
                )}
              </div>
              {!(messages[idx - 1]?.sender === sender) && (
                <span className="text-xs font-medium  text-gray-dark text-center">
                  {dateToTime(createdAt)}
                </span>
              )}
            </>
          )}
        </div>

        <div
          className={`flex flex-1 items-center justify-center max-w-full min-w-[70px]   p-4 rounded-xl bg-gray-light break-all  font-light text-gray-dark ${
            sender === auth.user._id
              ? 'rounded-tr-none bg-indigo-default text-white'
              : 'rounded-tl-none '
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Message;
