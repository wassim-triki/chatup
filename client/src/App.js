import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Signin from './pages/Signin';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PriveRouteNoAuth from './components/PriveRouteNoAuth';
import useAuth from './context/UserContext/UserState';
import Spinner from './components/Spinner';
import NotFound from './pages/NotFound';

import { useEffect, useState } from 'react';
import useSocket from './context/SocketContext/SocketState';

function App() {
  const { loading } = useAuth();

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
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
