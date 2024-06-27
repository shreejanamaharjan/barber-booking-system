import User from "../models/UserSchema.js";
import Barber from "../models/BarberSchema.js";


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
    const userID = req.userID
    try {
        const user = await User.findById(userID).select("-password")
        if (!user) {
            return res.status(404).json({ success: false, message: "USER NOT FOUND" })

        }
        const { password, ...rest } = user._doc;
        res.status(200).json({ success: true, message: "profile info is getting", data: { ...rest } })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

export const getMyAppointment = async (req, res) => {
    try {
        // retrieve appointment from booking for specific user

        // extract doctor if from appointment booking
        // retieve doctor using doctor id
    } catch (error) {

    }
}

// Controller to handle image upload
export const uploadImage = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Image uploaded successfully', file: req.file, });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message, });
    }
};
