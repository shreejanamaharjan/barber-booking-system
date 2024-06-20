import express from "express";
import { getAllUser, updateUser, deleteUser, getSingleUser, getUserByRole } from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";


const userRouter = express.Router();

userRouter.patch("/:id", authenticate, updateUser);
userRouter.get("/", authenticate, getAllUser);
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.get("/:id", authenticate, getSingleUser);
userRouter.get("/role/:role", authenticate, getUserByRole);


export default userRouter;