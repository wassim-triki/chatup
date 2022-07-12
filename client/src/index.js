import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext/UserState';
import { SocketProvider } from './context/SocketContext/SocketState';
import { ChatProvider } from './context/ChatContext/ChatState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SocketProvider>
      <UserProvider>
        <ChatProvider>
          <App />
          <ToastContainer
            autoClose={2500}
            pauseOnFocusLoss={false}
            position={'top-center'}
          />
        </ChatProvider>
      </UserProvider>
    </SocketProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
