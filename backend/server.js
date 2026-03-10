import 'dotenv/config'                              // ← keep only this one, must stay first
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import userModel from './models/userModel.js'
import productRouter from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// ── App Config ───────────────────────────────────────────────────────────────
const app  = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/uploads', express.static('uploads'))

// ── API Endpoints ────────────────────────────────────────────────────────────
app.use('/api/user',    userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',    cartRoute)
app.use('/api/order',   orderRouter)

app.get('/', (req, res) => res.send('API working'))
export default app 

app.listen(port, () => console.log('server is working on port: ' + port))