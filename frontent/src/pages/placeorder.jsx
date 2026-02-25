import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/shopcontext';
import Title from '../components/title';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import payment from '../components/payment';

const PlaceOrder = () => {
    const context = useContext(ShopContext);
    const navigate = useNavigate();
    
    // ✅ SAFE CONTEXT ACCESS
    const cartItems = context?.cartItems || {};
    const products = context?.products || [];
    const currency = context?.currency || '$';
    const delivery_fee = context?.delivery_fee || context?.delivery_charge || 10;
    const getCartAmount = context?.getCartAmount;
    
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '', address: '', city: '', pincode: '', paymentMethod: 'COD'
    });

    // ✅ SAFE TOTALS CALCULATION
    const subtotal = (getCartAmount && typeof getCartAmount === 'function') ? getCartAmount() || 0 : 0;
    const total = subtotal + delivery_fee;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
            toast.error('Please fill required fields');
            return;
        }
        toast.success('Order proceed to payment successfully!');
        navigate('/payment');
    };

    return (
        <div className='pt-5 sm:pt-14 min-h-[80vh] bg-gray-50'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 py-8'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Form */}
                    <div className='flex-1 lg:w-2/3'>
                        <div className='text-xl sm:text-2xl my-3 mb-8'>
                            <Title text1={'Delivery'} text2={'Information'} />
                        </div>
                        <form onSubmit={handleSubmit} className='bg-white p-6 sm:p-8 rounded-2xl shadow-xl'>
                            <div className='flex flex-col sm:flex-row gap-3 mb-6'>
                                <input name="firstName" onChange={handleInputChange} required className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:ring-2 focus:ring-blue-500' placeholder='First name *' />
                                <input name="lastName" onChange={handleInputChange} required className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:ring-2 focus:ring-blue-500' placeholder='Last name *' />
                            </div>
                            <input name="phone" onChange={handleInputChange} required className='border border-gray-300 rounded-lg py-3 px-4 w-full mb-4 focus:ring-2 focus:ring-blue-500' type="tel" placeholder='Phone *' />
                            <input name="mail" onChange={handleInputChange} required className='border border-gray-300 rounded-lg py-3 px-4 w-full mb-4 focus:ring-2 focus:ring-blue-500' type="mail" placeholder='Email*' />
                            <input name="address" onChange={handleInputChange} required className='border border-gray-300 rounded-lg py-3 px-4 w-full mb-6 focus:ring-2 focus:ring-blue-500' placeholder='Address *' />
                            <div className='flex flex-col sm:flex-row gap-3 mb-6'>
                                <input name="city" onChange={handleInputChange} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:ring-2 focus:ring-blue-500' placeholder='City' />
                                <input name="pincode" onChange={handleInputChange} className='border border-gray-300 rounded-lg py-3 px-4 w-full focus:ring-2 focus:ring-blue-500' placeholder='Pincode' />
                            </div>
                            <button type='submit' className='w-full bg-black text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-gray-800'>
                                PLACE ORDER - {currency}{(total || 0).toFixed(2)}
                            </button>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className='lg:w-1/3'>
                        <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-xl sticky top-20'>
                            <div className='text-xl sm:text-2xl my-3 mb-6'>
                                <Title text1={'Order'} text2={'Summary'} />
                            </div>
                            <div className='space-y-2 mb-6 p-4 bg-gray-50 rounded-xl'>
                                <div className='flex justify-between text-lg'>
                                    <span>Subtotal</span>
                                    <span>{currency}{(subtotal || 0).toFixed(2)}</span>
                                </div>
                                <div className='flex justify-between text-lg'>
                                    <span>Delivery</span>
                                    <span>{currency}{(delivery_fee || 0).toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className='flex justify-between text-xl font-bold'>
                                    <span>Total</span>
                                    <span>{currency}{(total || 0).toFixed(2)}</span>
                                </div>
                            </div>
                            <button onClick={() => navigate('/cart')} className='w-full border border-black text-black py-3 px-6 rounded-xl font-semibold hover:bg-black hover:text-white'>
                                ← Back to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
