import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/shopcontext'
import Cart from '../pages/cart';
import Title from './title';


const CartTotal = () => {
  const {currency,delivery_fee,getCartAmount}=useContext(ShopContext);
  
  return (
    <div className=' pl-130 w-full'>
      <div className=' text-2xl'>
        <Title text1={'CART'} text2={' TOTALS'}/>
      </div> 
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className=' flex justify-between'>
          <p>SubTotal</p>
          <p>${getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>$10.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>${getCartAmount()===0?0:getCartAmount()+10}.00</b>

        </div>

      </div>
    </div>
  )
}

export default CartTotal
