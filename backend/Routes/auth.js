import express from 'express';
import { register, login, verifyEmail } from '../Controllers/authcontroller.js';


const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/verifyEmail', verifyEmail)

export default authRouter;