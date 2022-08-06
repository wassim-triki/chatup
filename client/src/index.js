import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext/UserState';
import { ChatProvider } from './context/ChatContext/ChatState';
import { DarkModeProvider } from './context/DarkModeContext/DarkModeState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ChatProvider>
        <DarkModeProvider>
          <App />
          <ToastContainer
            autoClose={2500}
            pauseOnFocusLoss={false}
            position={'top-center'}
          />
        </DarkModeProvider>
      </ChatProvider>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
