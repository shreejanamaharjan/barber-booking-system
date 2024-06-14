import express from "express";
import { getAllUser, updateUser, deleteUser, getSingleUser, getUserByRole } from "../Controllers/userController.js";


const userRouter = express.Router();

userRouter.patch("/:id", updateUser);
userRouter.get("/", getAllUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getSingleUser);
userRouter.get("/role/:role", getUserByRole);


export default userRouter;