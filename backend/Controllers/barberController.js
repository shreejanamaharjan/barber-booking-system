import User from "../models/UserSchema.js";
import Barber from "../models/BarberSchema.js";

export const updateProfile = async (req, res) => {
    const { userId, phone, location, storeName } = req.body;
    try {
        //fetch user data
        let user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' })
        }

        // ensure user is barber
        if (user.role !== 'barber') {
            return res.status(404).json({ success: false, message: 'user not found' })
        }




        await user.save();
        res.status(201).json({ success: true, message: 'barber profile updated succesfully', data: users });
        console.log(user)


    } catch (error) {
        res.status(500).json({ message: 'internal server error, try again' });
        console.log(error)
    }
}