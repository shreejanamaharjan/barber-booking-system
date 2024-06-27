import mongoose from "mongoose";


const UserProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    photo: {
        type: String
    },
    location: { type: String },

});

export default mongoose.model("UserProfile", UserProfileSchema);