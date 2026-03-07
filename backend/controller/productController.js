import {v2 as cloudinary} from "cloudinary";
import Product from "../models/productModel.js";  // ✅ Fixed: Added .js
import multer from "multer";
import userModel from "../models/usermodel.js";

console.log('🔍 DEBUG - Product import:', Product ? '✅ LOADED' : '❌ FAILED');

export const addProduct = async (req, res) => {
    try {
        console.log('Body:', req.body)
        console.log('Files:', req.files)

        // ✅ Upload each file to Cloudinary and get secure URLs
        const imageFiles = req.files ? Object.values(req.files).flat() : []
        const images = await Promise.all(
            imageFiles.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'image'
                })
                return result.secure_url  // ✅ stores https://res.cloudinary.com/... URL
            })
        )

        const sizes = req.body.sizes || req.body.size ?
            JSON.parse(req.body.sizes || req.body.size) : []

        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: images,   // ✅ now Cloudinary URLs
            category: req.body.category,
            subCategory: req.body.subCategory,
            sizes: sizes,
            bestseller: req.body.bestseller === 'true'
        })

        const savedProduct = await newProduct.save()
        res.status(201).json({ success: true, message: 'Product added!', product: savedProduct })

    } catch (error) {
        console.error('Error:', error)
        res.status(400).json({ success: false, error: error.message })
    }
}
export const listproduct = async (req, res) => {  // ✅ Fixed: Proper export
    try {
        const products = await Product.find({});  // ✅ Uses Product
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const removeproduct = async (req, res) => {  // ✅ Fixed: Proper export
    try {
        await Product.findByIdAndDelete(req.body.id);  // ✅ Uses Product
        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const singleproduct = async (req, res) => {  // ✅ Fixed: Proper export
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
