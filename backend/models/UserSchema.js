import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  role: {
    type: String,
    enum: ["customer", "barber"],
    default: "customer",
  },
  image: {
    data: Buffer,
    contentType: String
  },
  location: { type: String },
  gender: { type: String, enum: ["male", "female", "other"] },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationCode: { type: String },
});

export default mongoose.model("User", UserSchema);