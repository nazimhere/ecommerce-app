import React from 'react'
import Title from '../components/title'
import { assets } from '../assets/assets'
import collection from './collection'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='pt-14'>
      {/* Header */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      {/* Main Content */}
      <div className='my-20 flex flex-col md:flex-row gap-10 px-4'>
        {/* Image */}
        <div className='flex-1 flex justify-center md:justify-start'>
          <img 
            className='w-full max-w-[450px] md:max-w-[500px] rounded-2xl shadow-xl object-cover'
            src={assets.about_img} 
            alt="About Us - Our Story" 
          />
        </div>
        
        {/* Text Content */}
        <div className='flex-1 flex flex-col justify-center md:w-1/2 text-gray-600 space-y-6 px-4 md:px-0'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Welcome to Our World of Fashion and Tech
          </h2>
          
          <p className='text-lg leading-relaxed'>
            Founded in 2026, we're passionate about bringing you the latest trends in Maret. 
            Our curated collection features high-quality apparel for every things required, 
            designed with comfort and style in mind.
          </p>

          <div className='space-y-4'>
            <div className='flex gap-4'>
              <div className='w-2 h-2 bg-black rounded-full'></div>
              <p>Premium quality materials sourced globally</p>
            </div>
            <div className='flex gap-4'>
              <div className='w-2 h-2 bg-black rounded-full'></div>
              <p>Fast delivery across Delhi and major cities</p>
            </div>
            <div className='flex gap-4'>
              <div className='w-2 h-2 bg-black rounded-full'></div>
              <p>Easy returns within 7 days</p>
            </div>
            <div className='flex gap-4'>
              <div className='w-2 h-2 bg-black rounded-full'></div>
              <p>Trusted by 10K+ happy customers</p>
            </div>
          </div>

         <Link to='/collection'> <button className='w-full md:w-auto bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 mt-4'>
            Shop Now →
          </button></Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-20 px-4'>
        <div className='text-center'>
          <h3 className='text-3xl font-bold text-gray-900'>10K+</h3>
          <p className='text-gray-600 mt-2'>Happy Customers</p>
        </div>
        <div className='text-center'>
          <h3 className='text-3xl font-bold text-gray-900'>500+</h3>
          <p className='text-gray-600 mt-2'>Products</p>
        </div>
        <div className='text-center'>
          <h3 className='text-3xl font-bold text-gray-900'>98%</h3>
          <p className='text-gray-600 mt-2'>Satisfaction</p>
        </div>
        <div className='text-center'>
          <h3 className='text-3xl font-bold text-gray-900'>24/7</h3>
          <p className='text-gray-600 mt-2'>Support</p>
        </div>
      </div>
    </div>
  )
}

export default About
