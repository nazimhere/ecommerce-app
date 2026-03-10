import React, { useState, useContext } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')  // ✅ GreatStack: starts at Login
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (e) => {   // ✅ GreatStack: onSubmitHandler
    e.preventDefault()
    try {
      if (currentState === 'Sign Up') {   // ✅ GreatStack: 'Sign Up'
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Registration successful!')
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success('Login successful!')
          navigate('/')
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8'>

        {/* Header */}
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900'>
            {currentState === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            {currentState === 'Sign Up' ? 'Join us today!' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <form className='space-y-6' onSubmit={onSubmitHandler}>
          {currentState === 'Sign Up' && (   // ✅ GreatStack: 'Sign Up'
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
              <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter your name'
                required
              />
            </div>
          )}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
            <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your email'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Forgot / Toggle links */}
          <div className='flex justify-between text-sm'>
            <p className='cursor-pointer text-gray-600'>Forgot your password?</p>
            {currentState === 'Login'
              ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-blue-600'>Create account</p>
              : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-blue-600'>Login here</p>
            }
          </div>

          <button
            type='submit'
            className='w-full bg-black text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200'
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login
