import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config()

const connectDB = async() =>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connected successfully");
    }catch(error){
        console.log("Error", error)
    }
};

export default connectDB;