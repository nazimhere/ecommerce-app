import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Profile = () => {
  const { token, backendUrl, products, currency, logout, navigate } = useContext(ShopContext)
  const [orders, setOrders]   = useState([])
  const [user, setUser]       = useState(null)
  const [activeTab, setActiveTab] = useState('orders')
  const [loading, setLoading] = useState(true)

  // ── Fetch user orders ──────────────────────────────────────────────────────
  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      )
      if (res.data.success) {
        // most recent first
        setOrders(res.data.orders.reverse())
      }
    } catch (err) {
      console.error(err)
    }
  }

  // ── Fetch user profile ─────────────────────────────────────────────────────
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token },
      })
      if (res.data.success) setUser(res.data.user)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchUser()
    fetchOrders()
  }, [token])

  // ── Status badge color ─────────────────────────────────────────────────────
  const statusStyle = (status) => {
    const map = {
      'Order Placed' : 'bg-blue-50 text-blue-600',
      'Packing'      : 'bg-yellow-50 text-yellow-600',
      'Shipped'      : 'bg-purple-50 text-purple-600',
      'Out for delivery': 'bg-orange-50 text-orange-600',
      'Delivered'    : 'bg-green-50 text-green-600',
    }
    return map[status] || 'bg-gray-100 text-gray-600'
  }

  if (loading) return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='w-10 h-10 border-2 border-gray-200 border-t-black rounded-full animate-spin' />
    </div>
  )

  return (
    <div className='max-w-5xl mx-auto px-4 py-14 min-h-[80vh]'>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className='flex items-center justify-between mb-10 border-b pb-6'>
        <div className='flex items-center gap-5'>

          {/* Avatar */}
          <div className='w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-2xl font-light tracking-widest uppercase select-none'>
            {user?.name?.charAt(0) || '?'}
          </div>

          <div>
            <h1 className='text-2xl font-light tracking-[0.15em] uppercase text-gray-900'>
              {user?.name || 'My Account'}
            </h1>
            <p className='text-sm text-gray-400 tracking-wide mt-0.5'>
              {user?.email || ''}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className='text-xs tracking-[0.15em] uppercase border border-gray-300 px-5 py-2.5 hover:bg-black hover:text-white hover:border-black transition-all duration-200'
        >
          Logout
        </button>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────── */}
      <div className='flex gap-8 mb-8 border-b'>
        {['orders', 'details'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
              activeTab === tab
                ? 'border-b-2 border-black text-black font-medium'
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab === 'orders' ? 'Order History' : 'Account Details'}
          </button>
        ))}
      </div>

      {/* ── Order History Tab ───────────────────────────────────────── */}
      {activeTab === 'orders' && (
        <div className='space-y-5'>
          {orders.length === 0 ? (
            <div className='text-center py-20'>
              <p className='text-gray-300 text-5xl mb-4'>◻</p>
              <p className='text-sm text-gray-400 tracking-widest uppercase'>No orders yet</p>
              <button
                onClick={() => navigate('/collection')}
                className='mt-6 text-xs tracking-[0.15em] uppercase border border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-200'
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className='border border-gray-100 hover:border-gray-300 transition-all duration-200 p-5'>

                {/* Order Meta */}
                <div className='flex items-center justify-between mb-4 pb-3 border-b border-gray-100'>
                  <div>
                    <p className='text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-0.5'>Order ID</p>
                    <p className='text-xs font-mono text-gray-600'>{order._id}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-0.5'>Date</p>
                    <p className='text-xs text-gray-600'>
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-0.5'>Total</p>
                    <p className='text-sm font-medium text-gray-900'>{currency}{order.amount}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-0.5'>Payment</p>
                    <p className='text-xs text-gray-600'>{order.paymentMethod}</p>
                  </div>
                  <span className={`text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm font-medium ${statusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className='space-y-3'>
                  {order.items.map((item, idx) => {
                    const product = products.find(p => p._id === item._id)
                    return (
                      <div key={idx} className='flex items-center gap-4'>
                        <img
                          src={product?.image?.[0] || ''}
                          alt={item.name}
                          className='w-14 h-14 object-cover bg-gray-50'
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm text-gray-800 truncate tracking-wide'>{item.name}</p>
                          <p className='text-xs text-gray-400 mt-0.5 tracking-wider uppercase'>
                            Size: {item.size} &nbsp;·&nbsp; Qty: {item.quantity}
                          </p>
                        </div>
                        <p className='text-sm text-gray-700 font-light'>{currency}{item.price}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Delivery Address */}
                <div className='mt-4 pt-3 border-t border-gray-100'>
                  <p className='text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1'>Delivered to</p>
                  <p className='text-xs text-gray-500'>
                    {order.address.firstName} {order.address.lastName} · {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}, {order.address.country}
                  </p>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* ── Account Details Tab ─────────────────────────────────────── */}
      {activeTab === 'details' && (
        <div className='max-w-md'>
          {[
            { label: 'Full Name',  value: user?.name },
            { label: 'Email',      value: user?.email },
            { label: 'Account ID', value: user?._id },
          ].map(({ label, value }) => (
            <div key={label} className='flex justify-between items-center py-4 border-b border-gray-100 last:border-0'>
              <span className='text-[10px] tracking-[0.2em] uppercase text-gray-400'>{label}</span>
              <span className='text-sm text-gray-700 font-light'>{value || '—'}</span>
            </div>
          ))}

          <button
            onClick={logout}
            className='mt-10 w-full text-xs tracking-[0.2em] uppercase bg-black text-white py-4 hover:bg-gray-900 transition-all duration-200'
          >
            Sign Out
          </button>
        </div>
      )}

    </div>
  )
}

export default Profile