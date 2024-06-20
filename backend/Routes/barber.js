import express from 'express';
import { updateProfile } from '../Controllers/barberController.js';

const barberRouter = express.Router();

barberRouter.get('/profile', updateProfile);

export default barberRouter;