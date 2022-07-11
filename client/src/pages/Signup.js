import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validate from '../helpers/validate';
import uploadImage from '../helpers/uploadImage';
import FormButton from '../components/FormButton';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import axios from '../api/axiosConfig';

const Signup = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    picture: '',
  });
  const [imageBlob, setImageBlob] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputs = [
    {
      label: 'First name',
      isRequired: true,
      type: 'text',
      name: 'firstName',
      format: {
        message: 'Please enter a valid full name',
      },
    },
    {
      label: 'Last name',
      isRequired: true,
      type: 'text',
      name: 'lastName',
      format: {
        message: 'Please enter a valid full name',
      },
    },
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
    if (input.type === 'file') {
      setImageBlob(input.files[0]);
    } else {
      setData({
        ...data,
        [input.name]: input.value,
      });
    }
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
      const url = '/auth/signup';
      let picURL = '';
      if (imageBlob) {
        picURL = await uploadImage(imageBlob);
      }

      const resp = await axios.post(url, { ...data, picture: picURL });
      toast(resp.data.message, { type: 'success' });
      navigate('/signin');
    } catch (err) {
      console.log(err);
      const { message } = err.response?.data;
      toast(message, { type: 'error' });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="text-4xl text-center">Welcome</h1>
        <div className="flex flex-col gap-2">
          {inputs.map(({ label, type, name, isRequired }, id) => (
            <Input
              key={id}
              label={label}
              type={type}
              name={name}
              value={data[name]}
              handleChange={handleChange}
              isRequired={isRequired}
              error={formErrors[name]}
              handleBlur={(e) => {
                setFormErrors({ ...formErrors, [name]: null });
              }}
            />
          ))}
        </div>
        <input
          className="hidden"
          accept="image/*"
          type="file"
          name="picture"
          onChange={handleChange}
          id="file"
        />
        <label
          htmlFor="file"
          className="border-2 text-center border-dashed border-gray-400 w-full h-[44px] flex justify-center items-center text-gray-500 cursor-pointer rounded-lg gap-1 hover:bg-green-light/20 transition-all duration-200 break-all px-3 text-xs"
        >
          {imageBlob?.name || (
            <>
              <AiOutlineCloudUpload className="text-lg" />
              Profile picture
            </>
          )}
        </label>
        <FormButton loading={loading} loadingText="Signing up...">
          Sign up
        </FormButton>
        <div className="text-sm  flex justify-center gap-1">
          <p className="text-gray-default">Already have an account?</p>
          <Link to="/signin" className="text-blue-700">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
