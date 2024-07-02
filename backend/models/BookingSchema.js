import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        barber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',

        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',

        },
        phone: { type: Number },
        price: {
            type: Number,

        },
        appointmentsDate: {
            type: Date,

        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending"
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
        comments: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema)