import express from 'express'
import { listproduct, addProduct, removeproduct, singleproduct } from '../controller/productController.js'
import multer from 'multer';  // ✅ npm package, NOT local file
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Multer setup directly here
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });  // ✅ Local variable

productRouter.post('/add',adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

productRouter.post('/remove',adminAuth, removeproduct);
productRouter.get('/list', listproduct);
productRouter.get('/single/:id', singleproduct);

export default productRouter;
