import React, { useState } from 'react'
import Title from '../components/title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='min-h-screen pt-14'>
      {/* Header */}
      <div className='text-center text-3xl pt-10 border-t'>
        <Title text1={'Contact'} text2={'Us'} />
      </div>

      {/* Main Content */}
      <div className='my-20 flex flex-col md:flex-row gap-10 px-4 mb-28 max-w-6xl mx-auto'>
        {/* Contact Image */}
        <div className='flex-1 flex justify-center md:justify-start'>
          <img 
            className='w-full md:max-w-[480px] rounded-2xl shadow-xl object-cover'
            src={assets.contact_img} 
            alt="Contact Us - Get In Touch" 
          />
        </div>

        {/* Contact Form + Info */}
        <div className='flex-1 flex flex-col justify-center md:w-1/2 space-y-8 px-4 md:px-0'>
          {/* Contact Info */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold text-gray-900'>Get In Touch</h3>
            <div className='space-y-3'>
              <div className='flex gap-3 items-center'>
                <div className='w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center'>
                  📧
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>Email</p>
                  <p className='text-gray-600'>quackcart@gmail.com</p>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center'>
                  📱
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>Phone</p>
                  <p className='text-gray-600'>+91 98765 43212</p>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center'>
                  📍
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>Address</p>
                  <p className='text-gray-600'>Meerut, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='space-y-4'>
            <h4 className='text-xl font-semibold text-gray-900'>Send us a Message</h4>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <input
                  type='text'
                  placeholder='Your Name'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  required
                />
              </div>
              <div>
                <input
                  type='email'
                  placeholder='Your Email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder='Your Message'
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows='4'
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full bg-black text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <NewsLetterbox/>
    </div>
  )
}

export default Contact
