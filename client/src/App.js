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

function App() {
  const { loading } = useAuth();
  const { isDark } = useDarkMode();

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
    </div>
  );
}

export default App;
