import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'
import {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus,
} from '../controller/orderController.js'

const orderRouter = express.Router()

// ── User Routes ──────────────────────────────────────────────────────────────
orderRouter.post('/place',        authUser, placeOrder)
orderRouter.post('/stripe',       authUser, placeOrderStripe)
orderRouter.post('/userorders',   authUser, userOrders)
orderRouter.post('/verifyStripe', authUser, verifyStripe)

// ── Admin Routes ─────────────────────────────────────────────────────────────
orderRouter.post('/list',         adminAuth, allOrders)
orderRouter.post('/status',       adminAuth, updateStatus)

export default orderRouter