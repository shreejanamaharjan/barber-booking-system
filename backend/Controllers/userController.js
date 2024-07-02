import User from "../models/UserSchema.js";
import Barber from "../models/BarberSchema.js";
import UserProfile from "../models/UserProfileSchema.js";
import Booking from "../models/BookingSchema.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';




function isPasswordValid(password) {
    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return false;
    }

    // Check if password contains at least one uppercase letter
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
        return false;
    }

    // Check if password contains at least one lowercase letter
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(password)) {
        return false;
    }

    // Check if password contains at least one symbol
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!symbolRegex.test(password)) {
        return false;
    }

    // Check if password contains at least one number
    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
        return false;
    }

    return true;
}

export const getAllUser = async (req, res) => {

    try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, message: "user found", data: users })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ sucess: false, message: "internal server failed" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const users = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select("-password");
        if (!users) {
            return res.status(404).send("user not found");
        }
        res.status(200).json({ success: true, message: "updated", data: users });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "failed to update" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(
            req.params.id
        ).select("-password");
        if (!users) {
            return res.status(404).send("user not found");
        }
        res.status(200).json({ success: true, message: "deleted", data: users });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "failed to delete" })
    }
}

export const getSingleUser = async (req, res) => {
    try {
        const users = await User.findById(
            req.params.id
        ).select("-password");
        if (!users) {
            return res.status(404).send("user not found");
        }

        res.status(200).json({ success: true, message: "user found", data: users });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const getUserByRole = async (req, res) => {
    const { role } = req.params;
    // Validate role
    if (!['customer', 'barber'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }
    try {
        const users = await User.find(
            { role }
        ).select("-password");
        if (users.lenght === 0) {
            return res.status(404).send("user not found");
        }
        res.status(200).json({ success: true, message: "user found", data: users });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const id = req.params.userId;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        // // Assuming you want to send the image data as a base64 string
        // const imageData = userProfile.image.data.toString("base64");

        res.status(200).json({
            user
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { password, location, phone } = req.body;
        const photo = req.file ? req.file.filename : undefined;


        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            req.file,
            { new: true }
        ).select("-password");
        if (!user) {
            return res.status(404).send("user not found");
        }
        if (password) {
            if (!isPasswordValid(password)) {
                return res.status(400).json({
                    success: false,
                    message: "Password must contain at least 8 characters, including uppercase and lowercase letters, symbols, and numbers.",
                });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        if (location) user.location = location;
        if (photo) user.photo = photo;
        await user.save();

        // let userProfile = await UserProfile.findOne({ userId: user._id });

        // if (!userProfile) {
        //     userProfile = new UserProfile({
        //         userId: user._id,
        //         photo,
        //         location,
        //         phone,
        //     });
        // } else {
        //     // Update user profile details
        //     if (location) userProfile.location = location;
        //     if (photo) userProfile.photo = photo;
        // }
        // console.log("The user profle", userProfile)

        // await userProfile.save();
        res.status(201).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// export const getMyAppointment = async (req, res) => {
//     try {
//         // Ensure req.userId is a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(req.userId)) {
//             return res.status(400).json({ success: false, message: "Invalid user ID" });
//         }

//         // Retrieve appointments from booking for specific user
//         const bookings = await Booking.find({ user: req.userId });
//         if (bookings.length === 0) {
//             return res.status(404).json({ success: false, message: "No appointments found" });
//         }

//         // Extract barber IDs from appointment bookings
//         const barberIds = bookings.map(booking => booking.barber.toString());

//         // Retrieve barbers using barber IDs
//         const barbers = await User.find({ _id: { $in: barberIds } }).select("-password");
//         res.status(200).json({ success: true, message: "Appointments retrieved successfully", data: barbers });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };



