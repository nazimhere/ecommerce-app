import express from 'express' 
import cors from 'cors'   
import dotenv from 'dotenv'
dotenv.config()           
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userModel from './models/usermodel.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'


//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
  
app.use(express.json());           // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse form data                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
app.use(cors())

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter)
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.send("api working")
})
app.listen(port, () => console.log('server is working on port: ' + port))
