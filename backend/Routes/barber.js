import express from 'express';
import { updateBarberProfile, getBarberInfo, getAllBarber, createService, getService, deleteService, getAllService } from '../Controllers/barberController.js';
import upload from "../Middleware/multer.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const barberRouter = express.Router();

barberRouter.post('/updateProfile/:id', upload.single('photo'), authenticate, updateBarberProfile);
barberRouter.get('/getSingleBarber/:id', authenticate, getBarberInfo);
barberRouter.get('/getAllBarber', authenticate, getAllBarber);
barberRouter.post('/createService/:barberID', authenticate, createService);
barberRouter.get('/getService/:barberID', authenticate, getService);
barberRouter.delete('/deleteService/:serviceID', authenticate, deleteService);
barberRouter.get('/getAllService/:barberID', authenticate, getAllService);

export default barberRouter;