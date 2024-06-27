import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  email: { type: String, },
  password: { type: String, },
  name: { type: String, },
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
});

export default mongoose.model("User", UserSchema);