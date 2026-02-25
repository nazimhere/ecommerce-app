import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopcontext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/relatedProducts';
import cart from './cart';
import CartTotal from '../components/cartTotal';
import placeorder from './placeorder';

const product = () => { 

  const {productId}=useParams();
   const {products,addToCart}=useContext(ShopContext);
   const [productData,setProductData]=useState(false);
   const [image,setImage]=useState('');
   const [size,setSize]=useState('');

   const fetchProductData=async()=>{
      products.map((item)=>{
        if(item._id===productId){
          setProductData(item)
          setImage(item.image[0])
          return null;
        }
      })

   }

   useEffect(()=>{
    fetchProductData();
   },[products,productId])

  return productData?(
    <div className='border-t-2 pt-10 transiction-opacity ease-in duration-500 opacity-100'>
      {/*=============================product data=========================*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
{/*===========================product image================================*/}
<div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll
     justify-between  sm:justify-normal sm:w-[18.7%] w-full'>
{
  productData.image.map((item,index)=>(
    <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
  ))
}
</div>
   <div className='w-full sm:w-[80%]'>
    <img className='h-auto w-full' src={image}  alt="" />
    </div>
</div>

{/*==============================product info data===============================*/}
             <div className='flex-1'>
              <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

      <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_dull_icon} alt="" className='w-3 5' />
              <p className='pl-2'>(90)</p>
      </div>
      <p className='mt-5 text-3xl font-medium'>${productData.price}</p>
      <p className='mt-5  text-gray-500 md:w-4/5'>{productData.description}</p>
      <div className='flex flex-col gap-4 my-8'>
        <p>Select Size</p>
        <div className='flex gap-2'>
               {productData.sizes.map((item,index)=>(
               <button onClick={() => setSize(item)} 
  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''
          }`} 
  key={index}>
  {item}
</button>)
)}
       </div>
<button onClick={()=>addToCart(productData._id,size)}  className='bg-black text-white px-6 py-2 text-sm active:bg-gray-700 w-50'>
 Add to Cart 
 </button> 
 <hr className='mt-8 sm:w-4/5' />
  <div>
    <p>100% Original Product.</p>
    <p>COD Available.</p>
    <p>Hassle Free Exchange And Return 7 Days Polivy</p>
  </div>
      </div> 
             </div>  
      </div>
{/*------------------------------description and review---------------------*/}
<div className='mt-20'>
  <div className='flex'>
    <b className='border px-5 py-3 text-sm'>Description</b>
    <p  className='border px-5 py-3 text-sm'>Reviews</p>
  </div>
  <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
    <p>A  digital storefront that allows businesses to sell products or
       services directly to customersover the internet. It serves as a
        virtual, 24/7 alternative to physical retail, featuring product listings, 
        secure payment gateways, shopping carts, and order management systems
        </p>
 <p> It allows people to buy and sell physical goods, services, and digital products
   over the internet rather than at a brick-and-mortar location
 </p>
  </div>
</div>

{/*=====================display related products=========================*/}
  <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div> 
  ): <div className='opacity-0'>

  </div>
}

export default product
