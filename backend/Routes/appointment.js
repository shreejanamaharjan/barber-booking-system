import express from 'express';
import { createAppointment } from '../Controllers/appointmentController.js';


const appointmentRouter = express.Router();

appointmentRouter.post('/createAppointment/:barberID/:userID', createAppointment);

export default appointmentRouter;

