import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
<div >
    <img src={assets.logo} className='mb-5 w-32' alt="" />
    <p className='w-full md:w-2/3 text-grey-600'>
    "Founded in 2026, quack_cart began with a simple mission: to Delivery the best.Today, we're proud
     to have helped 5k customers . We believe in our customer and Product, 
    and every purchase supports our goal to Charity."
    </p>
</div>
<div>
    <p className='text-xl font-medium mb-5'>COMPANY </p>
    <ul className='flex flex-col gap-1 text-gray-600'>
        <li>HOME</li>
        <li>ABOUT Us</li>
        <li>DELIVERY</li>
        <li>PRIVACY POLICY</li>
    </ul>
</div>
<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className='flex flex-col gap-1 text-gray-600'>
        <li>+91-9876543212</li>
        <li>quackcart@gmail.com</li>
     </ul>
   </div>
 </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2026@quack_cart.com-All Rights Resevered</p>

 
      </div>
    </div>
  )
}

export default Footer
