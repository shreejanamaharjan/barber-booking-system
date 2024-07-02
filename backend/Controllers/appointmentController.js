import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
// import Appointment from "../../frontend/src/pages/Barber/Appointment.jsx";

export const createAppointment = async (req, res) => {
    const { barberID, userID } = req.params;
    const { phone, appointmentDate, price, comments } = req.body;
    try {
        const appointment = new Booking({ barber: barberID, userId: userID, phone, price, comments });
        await appointment.save();
        res.status(201).json({
            message: 'Appointment created successfully',
            appointment
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

// export const getAllAppointments = async(req, res) =>{
//     try {
//         const appointments = await Appointment.find();
//         res.status(200).json({ appointments });
//       } catch (error) {
//         res.status(400).json({ error: error.message });
//       }
// }