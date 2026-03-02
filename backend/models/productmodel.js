import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: [String],                    // ✅ CORRECT: Array of strings (image paths)
    category: {type: String, required: true},
    subCategory: {type: String, required: true},
    sizes: [String],                    // ✅ Array of size strings
    bestseller: {type: Boolean},
    date: { 
        type: Date, 
        required: true,
        default: Date.now 
    }
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model("product", productSchema);
export default Product; 