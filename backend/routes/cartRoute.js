import express from 'express'
import { addToCart,getUserCart,updateCart } from '../controller/cartController.js'
import adminAuth from '../middleware/adminAuth.js'

const cartRoute=express.Router()

cartRoute.post('/get',adminAuth,getUserCart)

cartRoute.post('/add',adminAuth,addToCart)
cartRoute.post('/update',adminAuth,updateCart)

export default cartRoute