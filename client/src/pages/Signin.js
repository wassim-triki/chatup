import React, { useState } from 'react';
import Input from '../components/Input';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../api/axiosConfig';
// import axios from 'axios';
import validate from '../helpers/validate';
import FormButton from '../components/FormButton';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import parseJWT from '../helpers/parseJWT';
import useAuth from '../context/UserContext/UserState';
import Cookies from 'js-cookie';
import useSocket from '../context/SocketContext/SocketState';
import { ReactComponent as ChatupLogo } from '../assets/images/logo.svg';
const Signin = () => {
  const { loginUser, auth } = useAuth();
  const { socket, connectUser } = useSocket();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = [
    {
      label: 'Email',
      isRequired: true,
      type: 'text',
      name: 'email',

      format: {
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: 'Please enter a valid email',
      },
    },
    {
      label: 'Password',
      isRequired: true,
      type: 'password',
      name: 'password',
      format: {
        regex: /[0-9a-zA-Z]{8,}$/,
        message: 'Password must contain 8 characters or more.',
      },
    },
  ];

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const errors = validate(inputs, data);
      setFormErrors(errors);
      setIsSubmitted(true);
      if (Object.keys(errors).length > 0) {
        return;
      }
      const url = '/auth/signin';
      const resp = await axios.post(url, data);
      const { user } = resp.data;
      loginUser(user);
      toast(resp.data.message, { type: 'success' });
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error';
      toast(msg, { type: 'error' });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="form-page">
      <div className="form-container">
        <div className="flex flex-col">
          <div className=" flex justify-center items-center">
            <img
              className="h-[150px] w-[150px]"
              src={require('../assets/images/logo.png')}
              alt=""
            />
          </div>
          <h1 className="text-gray-dark text-2xl font-normal text-center font-roboto mb-5">
            Hello Again!
          </h1>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* <ChatupLogo /> */}

          <div className="form-inputs">
            {inputs.map(({ label, type, name }, id) => (
              <Input
                key={id}
                label={label}
                type={type}
                name={name}
                value={data[name]}
                handleChange={handleChange}
                error={formErrors[name]}
                handleBlur={(e) => {
                  setFormErrors({ ...formErrors, [name]: null });
                }}
              />
            ))}
          </div>

          <FormButton loading={loading} loadingText="Signing in...">
            Sign in
          </FormButton>
          <div className="text-sm  flex justify-center gap-1">
            <p className="text-gray-default">Don't have an account?</p>
            <Link to="/signup" className="text-blue-700">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
