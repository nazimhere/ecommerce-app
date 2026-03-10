import { useEffect, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const navigate       = useNavigate()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const { token, backendUrl, setCartItems } = useContext(ShopContext)

  // ── Stripe Verification ────────────────────────────────────────────────────
  const verifyStripe = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {
        setCartItems({})
        navigate('/orders')
      } else {
        navigate('/cart')
      }
    } catch (error) {
      console.error(error)
      navigate('/cart')
    }
  }

  // ── Run on Mount ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (token) verifyStripe()
  }, [token])

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin' />
        <p className='text-gray-500 text-sm tracking-wide'>Verifying your payment…</p>
      </div>
    </div>
  )
}

export default Verify
