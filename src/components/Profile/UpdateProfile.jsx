import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  };
  const { loading } = useSelector((state) => state.profile);
  return (
    <div className='py-12 min-h-screen flex justify-center items-center'>
      <form onSubmit={submitHandler} className='w-full max-w-md'>
        <h1 className='text-3xl font-semibold mb-16 text-center uppercase'>
          Update Profile
        </h1>
        <div className='space-y-4'>
          <div className='w-full'>
            <label htmlFor='name' className='block mb-1 font-bold'>
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
              placeholder='Abc Def'
              type='text'
            />
          </div>
          <div className='w-full'>
            <label htmlFor='email' className='block mb-1 font-bold'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
              placeholder='abc@gmail.com'
              type='email'
            />
          </div>
          <button
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
