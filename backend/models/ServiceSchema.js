import mongoose from "mongoose";

const barberServiceSchema = new mongoose.Schema({
    barberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barber',

    },
    serviceName: {
        type: String,

    },
    description: {
        type: String,

    },
    price: {
        type: Number,

    }
});
export default mongoose.model("BarberService", barberServiceSchema)

