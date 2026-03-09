import express from 'express'
import authUser from '../middleware/authUser.js'
import { loginUser, registerUser, adminLogin, createAdmin, getUserProfile } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login',    loginUser)
userRouter.post('/admin',    adminLogin)
userRouter.post('/createadmin', createAdmin)
userRouter.get('/profile',   authUser, getUserProfile)   // ← profile route

export default userRouter