import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from './database/db.js';
import authRouter from "./Routes/auth.js";
import userRouter from "./Routes/user.js"
import barberRouter from "./Routes/barber.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";


dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: "http://localhost:5173", // Replace with the actual origin of your frontend application
    credentials: true,
};

app.get('/', (req, res) => {
    res.send("hello");
});





// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors(corsOptions));
app.use('/barber-booking-system/auth', authRouter);
app.use('/barber-booking-system/users', userRouter,);
app.use('/barber-booking-system/barbers', barberRouter);
app.use('/barber-booking-system/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log("server is running on port" + port);
    connectDB();
})