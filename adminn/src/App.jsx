import React, { useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import List from './pages/list';
import Orders from './pages/order';
import Add from './pages/add';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export const backendUrl= import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):''); 

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
   
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {!token ? (  // ✅ Fixed: Shows Login when empty
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar  setToken={setToken}/>
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token}/>} />
                <Route path='/orders' element={<Orders token={token} />} />
                <Route path='/' element={<List />} /> {/* ✅ Default route */}
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>

  );
};
export default App;
