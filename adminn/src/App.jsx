import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import List from './pages/list';
import Orders from './pages/order';
import Add from './pages/add';
import Login from './components/Login';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl= import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [token, setToken] = useState(''); 

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {!token ? (  // ✅ Fixed: Shows Login when empty
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add />} />
                <Route path='/list' element={<List />} />
                <Route path='/orders' element={<Orders />} />
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
