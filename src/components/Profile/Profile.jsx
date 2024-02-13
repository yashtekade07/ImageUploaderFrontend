import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture, uploadImage } from '../../redux/actions/profile';
import { loadUser, logout } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import Loader from '../Layout/Loader/Loader';
import { useDisclosure } from '@chakra-ui/react';
const Profile = ({ user }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.profile);
  const navigate = useNavigate();
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

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.append('file', image);
    await dispatch(updateProfilePicture(myFrom));
    dispatch(loadUser());
  };

  const uploadImagehandler = async (e, image) => {
    navigate('/upload');
  };
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className='min-h-screen flex justify-center items-center py-6'>
          <div className='max-w-screen-lg w-full px-6'>
            <h2 className='text-3xl font-bold text-center text-yellow-500 uppercase mb-6'>
              Profile
            </h2>
            <div className='flex flex-col lg:flex-row justify-start items-center lg:items-start lg:justify-between space-y-8 lg:space-y-0 lg:space-x-16 p-4'>
              <div className='flex flex-col items-center'>
                <img
                  className='w-40 h-40 rounded-full object-cover'
                  src={user.avatar.url}
                  alt='Avatar'
                />
                <button
                  className='mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'
                  onClick={onOpen}
                >
                  Change Photo
                </button>
              </div>
              <div className='flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md'>
                <div>
                  <span className='text-yellow-600 font-bold'>Name:</span>
                  <span className='text-gray-700'>
                    {'  '}
                    {user.name}
                  </span>
                </div>
                <div>
                  <span className='text-yellow-600 font-bold'>Email:</span>
                  <span className='text-gray-700'>
                    {'  '}
                    {user.email}
                  </span>
                </div>
                <div>
                  <span className='text-yellow-600 font-bold'>Joined on:</span>
                  <span className='text-gray-700'>
                    {'  '}
                    {user.CreatedAt.split('T')[0]}
                  </span>
                </div>
                <div className='flex justify-center space-x-4'>
                  <Link to={'/updateprofile'}>
                    <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>
                      Update Profile
                    </button>
                  </Link>
                  <Link to={'/changepassword'}>
                    <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>
                      Change Password
                    </button>
                  </Link>
                  <button
                    className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'
                    onClick={uploadImagehandler}
                  >
                    Upload Photo
                  </button>
                  <button
                    className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <h2 className='text-2xl font-semibold my-8 text-center text-yellow-500 border-b-2 border-yellow-500 pb-2'>
              Images
            </h2>
            {user.uploads.length > 0 && (
              <div className='flex flex-wrap  items-center p-4'>
                {user.uploads.map((element) => (
                  <div className='w-48 m-2 rounded-lg shadow-md overflow-hidden bg-white'>
                    <img
                      className='w-full h-48 object-cover'
                      src={element.url}
                      alt='Example Image'
                    />
                  </div>
                ))}
              </div>
            )}
            <ChangePhotoBox1
              changeImageSubmitHandler={changeImageSubmitHandler}
              isOpen={isOpen}
              onClose={onClose}
              loading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

function ChangePhotoBox1({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
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
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div
          className={`fixed inset-0 z-50 overflow-y-auto ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className='flex items-center justify-center min-h-screen px-4'>
            <div className='bg-white rounded-lg shadow-lg max-w-md w-full'>
              <div className='py-6 px-8'>
                <h2 className='text-lg font-semibold mb-4'>Change Photo</h2>
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
                    Change
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
}
