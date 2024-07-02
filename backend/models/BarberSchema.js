import mongoose from "mongoose";

const BarberSchema = new mongoose.Schema({
  // Fields for barber only
  barberId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
  specification: { type: String, default: "" },
  bio: {
    type: String, default: ""
  },

  experience: {
    type: String, default: ""
  },

});

export default mongoose.model("Barber", BarberSchema);