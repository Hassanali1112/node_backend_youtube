import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewars/multer.middleware.js";
import { verifyJWT } from "../middlewars/auth.middleware.js";

export const userRouter = Router()

userRouter.route("/register").post( upload.fields([
  {
    name : "avatar",
    maxCount : 1
  },
  {
    name : "coverImage",
    maxCount : 1
  }
]) , registerUser)

userRouter.route("/login").post(loginUser)

// secured route

userRouter.route("/logout").post(verifyJWT, logoutUser)