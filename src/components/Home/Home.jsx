import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-semibold mb-4'>Welcome</h1>
        <div className='flex items-center'>
          <Link to='/login'>
            <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded mr-2'>
              Login
            </button>
          </Link>
          <p className='text-gray-600 font-bold mx-2'>OR</p>
          <Link to='/register'>
            <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded ml-2'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
