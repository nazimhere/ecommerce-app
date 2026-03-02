import mongoose, { mongo } from "mongoose";
 
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
      password:{type:String,required:true},
       cartData:{type:mongoose.Schema.Types.Mixed,default:{}},  // ✅ CORRECT

        name:{type:String,required:true},
     role: { type: String, default: "user", enum: ["user", "admin"] },

}, {minimize:false}
)

const userModel=mongoose.models.user ||mongoose.model('user',userSchema);
export default userModel;