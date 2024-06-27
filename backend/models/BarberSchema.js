import mongoose from "mongoose";

const BarberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  role: {
    type: String,
    enum: ["customer", "barber"],
    default: "customer",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: { type: String },

  // Fields for barber only
  specialization: { type: String, default: "" },
  qualification: {
    type: String, default: ""
  },

  experience: {
    type: String, default: ""
  },

});

export default mongoose.model("Barber", BarberSchema);