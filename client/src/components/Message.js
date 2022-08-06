import React from 'react';
import useChat from '../context/ChatContext/ChatState';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';
import ImageMessage from './ImageMessage';
import TextMessage from './TextMessage';

const Message = ({ _id, sender, createdAt, content, images, idx }) => {
  const { messages, openChat } = useChat();
  const { isDark } = useDarkMode();
  const { auth } = useAuth();
  return (
    <div
      className={`w-full h-fit font-poppins flex text-xs lg:text-base ${
        sender === auth.user._id ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={` lg:max-w-[80%] max-w-[90%]  h-full flex  min-w-[70px]  gap-2 ${
          sender === auth.user._id && 'flex-row-reverse'
        }`}
      >
        <div
          className={`${
            sender === auth.user._id ? 'hidden' : 'w-6 lg:w-8 '
          } h-full flex flex-col items-center gap-1 `}
        >
          {sender != auth.user._id && (
            <>
              <div className="w-6 h-6 lg:h-8 lg:w-8 ">
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
                <span
                  className={`text-xs font-medium ${
                    isDark ? 'text-dark-70' : 'text-gray-dark'
                  } text-center`}
                >
                  {dateToTime(createdAt)}
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          {content && <TextMessage sender={sender} content={content} />}
          {images?.map((image, idx) => (
            <ImageMessage key={idx} sender={sender} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
