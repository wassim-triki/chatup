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

function App() {
  const { loading } = useAuth();
  const { isDark } = useDarkMode();
  const { modalContent, modalIsOpen } = useModal();
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
        <div className="h-screen w-screen flex items-center justify-center">
          <Spinner
            size="16"
            fill="green-dark"
            // className="h-16 w-16 fill-green-light text-green-light "
          />
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
      <ReactModal isOpen={modalIsOpen} style={customStyles}>
        {modalContent?.id == 'delete-chat' ? (
          <DeleteChatModalContent {...modalContent.props} />
        ) : (
          ''
        )}
      </ReactModal>
    </div>
  );
}

export default App;
