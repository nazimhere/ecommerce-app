import  express from 'express';
import { loginUser,adminLogin,registerUser,createAdmin } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/create-admin', createAdmin);

export default userRouter;  