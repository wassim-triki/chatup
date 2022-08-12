import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PriveRouteNoAuth from './components/PriveRouteNoAuth';
import useAuth from './context/UserContext/UserState';
import Spinner from './components/Spinner';
import NotFound from './pages/NotFound';
import { SocketProvider } from './context/SocketContext/SocketState';
import { ToastContainer } from 'react-toastify';
import useDarkMode from './context/DarkModeContext/DarkModeState';
import ReactModal from 'react-modal';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import useModal from './context/ModalContext/ModalState';
import DeleteChatModalContent from './components/DeleteChatModalContent';
import { ThreeDots } from 'react-loader-spinner';
import { IoIosClose } from 'react-icons/io';
import ImageModalContent from './components/ImageModalContent';
function App() {
  const { loading } = useAuth();
  const { isDark } = useDarkMode();
  const { modalContent, modalIsOpen, closeModal } = useModal();
  const customStyles = {
    overlay: {
      backgroundColor: '#0000005c',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: `${isDark ? '#141414' : '#fff'}`,
      color: `${isDark ? '#fff' : '#141414'}`,
      border: 'none',
      boxShadow: `${
        isDark
          ? '0px 0px 20px 0px #050505ab'
          : 'rgb(122 122 122 / 67%) 0px 0px 20px 0px'
      }`,
      borderRadius: '15px',
    },
  };
  return (
    <div className="App">
      {loading ? (
        <div
          className={`h-screen w-screen flex items-center justify-center ${
            isDark ? 'bg-dark-100' : 'bg-gray-light'
          }`}
        >
          <ThreeDots color="#3cc6b7" height={50} width={50} />
        </div>
      ) : (
        <Routes>
          <Route path="/signup" element={<PriveRouteNoAuth />}>
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/signin" element={<PriveRouteNoAuth />}>
            <Route path="/signin" element={<Signin />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <SocketProvider>
                  <Home />
                </SocketProvider>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <ToastContainer
        autoClose={2500}
        pauseOnFocusLoss={false}
        position={'bottom-center'}
        toastStyle={{
          backgroundColor: `${isDark ? '#141414' : ''}`,
          color: `${isDark ? '#fff' : ''}`,
        }}
      />
      {/* modalIsOpen */}
      <ReactModal isOpen={modalIsOpen} style={customStyles}>
        {modalContent?.id == 'delete-chat' ? (
          <DeleteChatModalContent {...modalContent.props} />
        ) : modalContent?.id == 'image' ? (
          <ImageModalContent {...modalContent.props} />
        ) : (
          ''
        )}
      </ReactModal>
    </div>
  );
}

export default App;
