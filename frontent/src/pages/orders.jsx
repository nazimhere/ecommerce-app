import React, { useContext } from 'react'
import { ShopContext } from '../context/shopcontext'
import Title from '../components/title'

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-4'>
        <Title text1={'My'} text2={'Orders'} />
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => {
          const orderDate = new Date(Date.now() - (index + 1) * 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
          const orderSize = ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)];
          const orderQuantity = Math.floor(Math.random() * 3) + 1;
          
          return (
            <div key={item._id || index} className='py-6 border-b last:border-b-0 bg-white hover:bg-gray-50 p-4 rounded-lg'>
              {/* Order Header */}
              <div className='flex justify-between items-start mb-4'>
                <div>
                  <h3 className='font-bold text-lg'>{item.name}</h3>
                  <p className='text-sm text-gray-500'>Order #{1001 + index} • {orderDate}</p>
                </div>
                <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
                  Ready To Ship
                </span>
              </div>

              {/* Product Details */}
              <div className='flex flex-col lg:flex-row gap-6'>
                {/* Product Image + Basic Info */}
                <div className='flex items-start gap-4 flex-1'>
                  <img 
                    src={item.image?.[0] || '/placeholder.jpg'} 
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded-lg flex-shrink-0'
                  />
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2 text-sm mb-1'>
                      <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs'>
                        Size: {orderSize}
                      </span>
                      <span className='bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs'>
                        Qty: {orderQuantity}
                      </span>
                    </div>
                    <p className='font-semibold text-gray-900'>
                      {currency} {(item.price * orderQuantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Order Total & Actions */}
                <div className='flex flex-col items-end gap-2 text-sm'>
                  <p className='font-semibold text-lg text-green-600'>
                    {currency} {(item.price * orderQuantity).toFixed(2)}
                  </p>
                  <button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                    Track order →
                  </button>
                </div>
              </div>
            </div>  // ✅ Proper single closing
          )  // ✅ Map return closing
        })}  
      </div>
    </div>
  )
}

export default Orders
