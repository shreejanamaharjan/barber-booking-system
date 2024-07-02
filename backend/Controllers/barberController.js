import User from "../models/UserSchema.js";
import Barber from "../models/BarberSchema.js";
import BarberService from "../models/ServiceSchema.js"

export const updateBarberProfile = async (req, res) => {
    try {
        const { password, location, phone, specification, bio, experience } = req.body;
        const photo = req.file ? req.file.filename : undefined;


        const barber = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            req.file,
            { new: true }
        ).select("-password");
        if (!barber) {
            return res.status(404).send("user not found");
        }
        if (password) {
            if (!isPasswordValid(password)) {
                return res.status(400).json({
                    success: false,
                    message: "Password must contain at least 8 characters, including uppercase and lowercase letters, symbols, and numbers.",
                });
            }
            barber.password = await bcrypt.hash(password, 10);
        }

        if (location) barber.location = location;
        if (photo) barber.photo = photo;
        await barber.save();
        console.log(barber._id)

        let barberProfile = await Barber.findOne({ barberId: barber._id });

        if (!barberProfile) {
            barberProfile = new Barber({
                barberId: barber._id,
                specification,
                bio,
                experience,
            });
        } else {
            // Update barber profile details
            if (specification) barberProfile.specification = specification;
            if (bio) barberProfile.bio = bio;
            if (experience) barberProfile.experience = experience;
        }
        console.log("The user profle", barberProfile)

        await barberProfile.save();
        res.status(201).json({ message: 'User updated successfully', barber, barberProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getBarberInfo = async (req, res) => {
    try {
        const barber = await User.findById(req.params.id).select("-password");
        if (!barber) {
            return res.status(404).send("barber not found");
        }
        const barberDetail = await Barber.findOne({ barberId: barber._id })
        res.status(200).json({ success: true, message: "barber info is getting", barber, barberDetail })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal serer error" })
    }
}

export const getAllBarber = async (req, res) => {
    try {
        const barbers = await User.find({ role: 'barber' });
        // const details = await Barber.findOne(barbers._id)
        res.status(200).json({ barbers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const createService = async (req, res) => {
    const { barberID } = req.params;
    const { serviceName, serviceDescription, servicePrice } = req.body;
    try {
        const service = new BarberService({ barberId: barberID, serviceName, description: serviceDescription, price: servicePrice });
        await service.save();
        res.status(201).json({
            message: 'service created successfully',
            service
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

export const getService = async (req, res) => {
    const barberId = req.params.barberID
    try {
        const service = await BarberService.find({ barberId });
        res.status(200).json({ service });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteService = async (req, res) => {
    try {
        const service = await BarberService.findByIdAndDelete(
            req.params.serviceID
        )
        res.status(200).json({ success: true, message: "deleted", service });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "failed to delete" })
    }
}

export const getAllService = async (req, res) => {
    const barberId = req.params.barberID
    try {

        const service = await BarberService.find({ barberId });
        res.status(200).json({ service, barberId });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}
