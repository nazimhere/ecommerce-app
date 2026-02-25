import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Option 1: Local MongoDB (if MongoDB installed locally)
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error('❌ MongoDB Error:', error.message);
        process.exit(1);
    }
}

export default connectDB;
