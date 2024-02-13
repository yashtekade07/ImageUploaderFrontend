import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
    navigate('/profile');
  };
  const { loading, message, error } = useSelector((state) => state.profile);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <div className='py-12 min-h-screen flex justify-center items-center'>
      <form onSubmit={submitHandler} className='w-full max-w-md'>
        <h1 className='text-3xl font-semibold mb-16 text-center uppercase'>
          Change Password
        </h1>
        <div className='space-y-6'>
          <input
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
            placeholder='Old password'
            type='password'
          />
          <input
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded focus:outline-none focus:border-yellow-500'
            placeholder='New password'
            type='password'
          />
          <button
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
