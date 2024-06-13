import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from './database/db.js';
import router from "./Routes/auth.js"; 


dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: "http://localhost:5173", // Replace with the actual origin of your frontend application
    credentials: true,
};

app.get('/', (req, res)=>{
    res.send("hello");
});





// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/barber-booking-system', router);

app.listen(port, () =>{
    console.log("server is running on port"+ port);
    connectDB();
})