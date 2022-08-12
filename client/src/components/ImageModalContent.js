import React from 'react';
import { IoIosClose } from 'react-icons/io';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import useModal from '../context/ModalContext/ModalState';

const ImageModalContent = ({ image }) => {
  const { closeModal } = useModal();
  const { isDark } = useDarkMode();
  return (
    <div className="flex justify-center items-center relative h-[90vh] w-[80vw]">
      <button
        onClick={closeModal}
        className={`absolute top-0 right-0 ${
          isDark ? 'bg-white text-black' : 'bg-black text-white'
        }  rounded-full w-8 h-8 flex justify-center items-center`}
      >
        <IoIosClose className="   text-3xl hover:text-2xl z-50" />
      </button>
      <img className="w-full md:h-full md:w-auto" src={image} alt="" />
    </div>
  );
};

export default ImageModalContent;
