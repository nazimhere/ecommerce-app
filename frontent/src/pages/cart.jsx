import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopcontext'
import { assets } from '../assets/assets';
import CartTotal from '../components/cartTotal';
import { useNavigate } from 'react-router-dom';  // ✅ FIX 1: Proper import
import Title from '../components/title';  // ✅ FIX 2: Missing Title import

const Cart = () => {
    // ✅ FIX 3: Added missing context values + proper navigate
    const { products, currency, cartItems, removeFromCart, getCartAmount, delivery_fee } = useContext(ShopContext);
    const navigate = useNavigate();  // ✅ Proper React Router hook
    
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    // ✅ FIX 4: Calculate totals safely
    const subtotal = (getCartAmount && typeof getCartAmount === 'function') ? getCartAmount() || 0 : 0;
    const total = subtotal + (delivery_fee || 0);

    return (
        <div className='border-t pt-14 max-w-6xl mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-6'>YOUR CART</h1>
            
            {/* Cart Items */}
            <div className='lg:grid lg:grid-cols-3 lg:gap-8'>
                <div className='lg:col-span-2'>
                    {cartData.map((item, index) => {
                        const productData = products.find(product => product._id === item._id);
                        
                        return (
                            <div key={`${item._id}-${item.size}`} className="flex gap-4 py-6 border-b last:border-b-0 items-start">
                                <img 
                                    src={productData?.image?.[0]} 
                                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0" 
                                    alt={productData?.name}
                                />
                                
                                <div className="flex-1 min-w-0 px-8">
                                    <h3 className="font-semibold text-xl mb-1 truncate">{productData?.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">Size: <span className="font-medium">{item.size}</span></p>
                                    <p className="text-2xl font-bold text-green-600 mb-4">
                                        {currency}{productData?.price}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col items-center gap-3 text-center flex-shrink-0">
                                    <span className="text-2xl font-bold min-w-[50px]">{item.quantity}</span>
                                    <p className="text-sm text-gray-500 px-5">Qty</p>  {/* ✅ FIX 5: px-55 → px-5 */}
                                </div>
                                
                                {/* ✅ FIX 6: Delete button properly positioned */}
                                <img 
                                    className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform mt-2 sm:w-6 flex-shrink-0 ml-4'
                                    onClick={() => removeFromCart(item._id, item.size)}
                                    src={assets.bin_icon} 
                                    alt="Remove item"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* ✅ FIX 7: Fixed Order Summary layout */}
                <div className='lg:w-full lg:sticky lg:top-20 lg:h-screen lg:flex lg:flex-col'>
                    <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-xl'>
                        <div className='text-xl sm:text-2xl my-3 mb-6'>
                            <Title text1={'Order'} text2={'Summary'} />  {/* ✅ Now imported */}
                        </div>
                        
                        <div className='space-y-2 mb-6 p-4 bg-gray-50 rounded-xl'>
                            <div className='flex justify-between text-lg'>
                                <span>Subtotal</span>
                                <span>{currency}{(subtotal || 0).toFixed(2)}</span>  {/* ✅ Now defined */}
                            </div>
                            <div className='flex justify-between text-lg'>
                                <span>Delivery</span>
                                <span>{currency}{(10 || 0).toFixed(2)}</span>  {/* ✅ Now defined */}
                            </div>
                            <hr />
                            <div className='flex justify-between text-xl font-bold'>
                                <span>Total</span>
                                <span>{currency}{(total+10 || 0).toFixed(2)}</span>  {/* ✅ Now defined */}
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => navigate('/placeorder')} 
                            className='w-full bg-black text-white text-sm my-8 py-4 px-8 rounded-xl font-semibold hover:bg-gray-800 transition-colors'
                            disabled={subtotal === 0}  // ✅ Disable if empty cart
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
