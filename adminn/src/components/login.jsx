import React, { useState } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
  e.preventDefault();  // 
  try {
    const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
    if (response.data.success) {
      setToken(response.data.token)
      toast.success('Login successful!')  // ✅ optional
    } else {
      toast.error(response.data.message)
    }
  } catch(e) {
    console.log(e);
    toast.error(e.message)
  }
};

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='p-8 bg-white rounded-lg shadow-md w-96'>
        <h1 className='text-3xl font-bold text-center mb-8'>Admin Panel</h1>
        
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <p className='mb-2 text-gray-700'>Email id</p>
            <input 
              type='email' 
              placeholder='your@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required 
            />
          </div>
          
          <div className='mb-8'>
            <p className='mb-2 text-gray-700'>Password</p>
            <input 
              type='password'  // ✅ FIXED
              placeholder='enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              required 
            />
          </div>
          
          <button 
            type='submit'
            className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 font-semibold'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
