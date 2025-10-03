import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://sayedaslam4321:Aslam9584@cluster0.3ztzsre.mongodb.net/food-del').then(()=>console.log("DB connected"));
}