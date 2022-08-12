import React from 'react';
import useModal from '../context/ModalContext/ModalState';
import useAuth from '../context/UserContext/UserState';

const ImageMessage = ({ sender, image }) => {
  const { auth } = useAuth();
  const { openModal, closeModal, setModalContent } = useModal();
  return (
    <img
      onClick={(e) => {
        setModalContent({
          id: 'image',
          props: {
            image,
          },
        });
        openModal();
      }}
      src={image}
      alt=""
      className={`max-w-[250px] max-h-[250px] cursor-pointer ${
        sender === auth.user._id ? 'self-end' : 'self-start'
      } rounded-xl ${
        sender === auth.user._id ? 'justify-self-end' : 'justify-self-start'
      }`}
    />
  );
};

export default ImageMessage;
