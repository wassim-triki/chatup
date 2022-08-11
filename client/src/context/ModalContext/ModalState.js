import { useContext, useState } from 'react';
import ModalContext from './ModalContext';

export const ModalProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        modalIsOpen,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);
export default useModal;
