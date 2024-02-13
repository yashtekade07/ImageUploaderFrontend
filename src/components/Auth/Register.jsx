import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'White',
};
const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};
const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const defaultAvatarSrc = 'path/to/default/avatar/image.jpg';
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.append('name', name);
    myFrom.append('email', email);
    myFrom.append('password', password);
    myFrom.append('file', image);

    dispatch(register(myFrom));
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-semibold mb-4 text-center'>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className='mb-4 flex justify-center'>
            <img
              src={imagePrev || defaultAvatarSrc}
              alt='Avatar'
              className='w-24 h-24 rounded-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-1'>
              Name
            </label>
            <input
              required
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
              placeholder='abc'
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1'>
              Email Address
            </label>
            <input
              required
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
              placeholder='abc@gmail.com'
              type='email'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block mb-1'>
              Password
            </label>
            <input
              required
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
              placeholder='Enter your password'
              type='password'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='chooseAvatar' className='block mb-1'>
              Choose Avatar
            </label>
            <input
              accept='image/*'
              id='chooseAvatar'
              type='file'
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
              onChange={changeImageHandler}
            />
          </div>
          <button
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4'
            type='submit'
          >
            Sign Up
          </button>
          <div className='text-center'>
            <span className='mr-1'>Already a User?</span>
            <Link
              to='/login'
              className='text-yellow-500 hover:text-yellow-600 font-semibold'
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
