import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopcontext'
import Title from './title';
import ProductItem from './productItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

 useEffect(() => {
  if (products && Array.isArray(products)) {
    const bestProducts = products.filter((item) => item.bestseller); // ✅ CORRECT
    setBestSeller(bestProducts.slice(0, 5));
  }
}, [])

  // Keep empty - PERFECT for this case
 // Added products dependency

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1="BEST" text2="SELLER"/> 
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          The "Limited Offer" Deal: "Our #1 best-seller is now 
          20% off for the next 24 hours only. Use code BEST20 "
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item) => (
          <ProductItem 
            key={item._id}  // Better than index
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}
export default BestSeller
