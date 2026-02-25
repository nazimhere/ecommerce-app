import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState] = useState('sign up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Add your login/register logic here
    if (currentState === 'sign up') {
      // Register user
      localStorage.setItem('user', JSON.stringify(formData));
      alert('Registration successful!');
    } else {
      // Login user
      const user = localStorage.getItem('user');
      if (user) {
        alert('Login successful!');
      } else {
        alert('User not found!');
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900'>
            {currentState === 'sign up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            {currentState === 'sign up' 
              ? 'Join us today!' 
              : 'Sign in to your account'
            }
          </p>
        </div>

        {/* Form */}
        <form className='space-y-6' onSubmit={handleSubmit}>
          {currentState === 'sign up' && (
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter your name'
                required
              />
            </div>
          )}

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your email'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-black text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200'
          >
            {currentState === 'sign up' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Toggle */}
        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            {currentState === 'sign up' ? 'Already have an account?' : "Don't have an account?"}
            <button
              type='button'
              onClick={() => setCurrentState(currentState === 'sign up' ? 'sign in' : 'sign up')}
              className='font-semibold text-blue-600 hover:text-blue-500 ml-1'
            >
              {currentState === 'sign up' ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className='text-center'>
          <Link to='/orders' className='text-sm text-blue-600 hover:text-blue-500'>
            Continue as Guest →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
