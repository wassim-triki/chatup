import React from 'react';
import useAuth from '../context/UserContext/UserState';

const ImageMessage = ({ sender, image }) => {
  const { auth } = useAuth();
  return (
    <img
      src={image}
      alt=""
      className={`max-w-[250px] max-h-[250px] ${
        sender === auth.user._id ? 'self-end' : 'self-start'
      } rounded-xl ${
        sender === auth.user._id ? 'justify-self-end' : 'justify-self-start'
      }`}
    />
  );
};

export default ImageMessage;
