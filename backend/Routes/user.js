import express from "express";
import { getAllUser, updateUser, deleteUser, getSingleUser, getUserByRole, uploadImage, getUser } from "../Controllers/userController.js";
import upload from "../Middleware/multer.js";
import { authenticate, restrict } from "../auth/verifyToken.js";


const userRouter = express.Router();

userRouter.patch("/:id", authenticate, updateUser);
userRouter.get("/", authenticate, getAllUser);
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.get("/:id", authenticate, getSingleUser);
userRouter.get("/role/:role", authenticate, getUserByRole);
userRouter.get("/getuser/:id", authenticate, getUser);
// Image upload endpoint
userRouter.post('/upload', upload.single('image'), uploadImage);


export default userRouter;