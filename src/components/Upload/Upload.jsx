import React, { useState } from 'react';
import { uploadImage } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../redux/actions/user';

const Upload = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const { loading } = useSelector((state) => state.image);
  const navigate = useNavigate();
  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };
  const closeHandler = () => {
    setImagePrev('');
    setImage('');
    navigate('/profile');
  };
  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.append('file', image);
    await dispatch(uploadImage(myFrom));
    dispatch(loadUser());
    navigate('/profile');
  };
  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${'block'}`}>
          <div className='flex items-center justify-center min-h-screen px-4'>
            <div className='bg-white rounded-lg shadow-lg max-w-md w-full'>
              <div className='py-6 px-8'>
                <h2 className='text-lg font-semibold mb-4'>Upload Photo</h2>
                <button
                  onClick={closeHandler}
                  className='absolute top-0 right-0 p-2'
                >
                  <svg
                    className='h-6 w-6 text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
                <div className='mb-8'>
                  {imagePrev && (
                    <img
                      src={imagePrev}
                      alt='Preview'
                      className='w-40 h-40 mx-auto mb-4 rounded-full object-cover'
                    />
                  )}
                  <label className='w-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded cursor-pointer'>
                    Choose File
                    <input
                      type='file'
                      className='hidden'
                      onChange={changeImage}
                    />
                  </label>
                  <button
                    className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full mt-4'
                    onClick={(e) => changeImageSubmitHandler(e, image)}
                  >
                    Upload
                  </button>
                </div>
                <div className='text-right'>
                  <button
                    className='text-gray-600 hover:text-gray-800 font-semibold'
                    onClick={closeHandler}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
