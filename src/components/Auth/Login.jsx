import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-full max-w-md'>
        <h1 className='text-3xl font-semibold mb-4 text-center'>Welcome</h1>
        <form onSubmit={submitHandler}>
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
          <button
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4'
            type='submit'
          >
            Login
          </button>
          <div className='text-center'>
            <span className='mr-1'>New User?</span>
            <Link
              to='/register'
              className='text-yellow-500 hover:text-yellow-600 font-semibold'
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
