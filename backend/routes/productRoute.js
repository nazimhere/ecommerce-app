import express from 'express'
import { listproduct, addProduct, removeproduct, singleproduct } from '../controller/productController.js'
import multer from 'multer'
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router()

const storage = multer.memoryStorage()

const upload = multer({ storage })
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct)

productRouter.post('/remove', adminAuth, removeproduct)
productRouter.get('/list', listproduct)
productRouter.get('/single/:id', singleproduct)

// ❌ DELETE these two lines — they were the cause of the crash
// router.post('/remove', adminAuth, removeproduct)
// router.get('/list', listproduct)

export default productRouter