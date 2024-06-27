import express from "express";
import { getAllUser, updateUser, deleteUser, getSingleUser, getUserProfile, getUserByRole, updateUserProfile } from "../Controllers/userController.js";
import upload from "../Middleware/multer.js";
import { authenticate, restrict } from "../auth/verifyToken.js";


const userRouter = express.Router();

userRouter.patch("/:id", authenticate, updateUser);
userRouter.get("/", authenticate, getAllUser);
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.get("/:id", authenticate, getSingleUser);
userRouter.get("/userProfile/:userId", authenticate, getUserProfile);
// userRouter.get("/profile/me", authenticate, getUserProfile);
// userRouter.get("/my-appointments", authenticate, getMyAppointment)
userRouter.post("/userProfileUpdate/:id", upload.single('photo'), authenticate, updateUserProfile)






userRouter.get("/role/:role", authenticate, getUserByRole);
// userRouter.get("/getuser", authenticate, getUser);
// Image upload endpoint
// userRouter.post('/upload', upload.single('image'), uploadImage);


export default userRouter;