import mongoose from "mongoose";

const BarberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  image: { type: String },
  phone: { type: Number, default: 0 },
  location: { type: String, default: "" },




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