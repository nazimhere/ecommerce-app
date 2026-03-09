import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Stripe from 'stripe'

// ── Gateway Instance ─────────────────────────────────────────────────────────
const stripe        = new Stripe(process.env.STRIPE_SECRET_KEY)
const DELIVERY_CHARGE = 10
const CURRENCY        = 'usd'

// ── Place Order  (COD) ───────────────────────────────────────────────────────
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod : 'COD',
      payment       : false,
      date          : Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({ success: true, message: 'Order Placed' })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Place Order  (Stripe) ────────────────────────────────────────────────────
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body
    const { origin } = req.headers

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod : 'Stripe',
      payment       : false,
      date          : Date.now(),
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    const line_items = items.map((item) => ({
      price_data: {
        currency    : CURRENCY,
        product_data: { name: item.name },
        unit_amount : item.price * 100,
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency    : CURRENCY,
        product_data: { name: 'Delivery Charges' },
        unit_amount : DELIVERY_CHARGE * 100,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url  : `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode        : 'payment',
    })

    res.json({ success: true, session_url: session.url })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Verify Stripe Payment ────────────────────────────────────────────────────
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body

    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({ success: true, message: 'Payment successful' })
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, message: 'Payment failed' })
    }
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ── All Orders  (Admin) ──────────────────────────────────────────────────────
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ── User Orders ──────────────────────────────────────────────────────────────
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// ── Update Order Status  (Admin) ─────────────────────────────────────────────
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: 'Status Updated' })
  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
}