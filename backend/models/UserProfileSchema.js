import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    image: {
        data: Buffer,
        contentType: String
    },
    location: { type: String },
    bio: { type: String }

});

export default mongoose.model("UserProfile", UserProfileSchema);