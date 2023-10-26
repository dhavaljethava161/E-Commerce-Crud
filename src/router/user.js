import express from "express";
import {
  Delete,
  create,
  otpSend,
  resetPassword,
  signin,
  update,
} from "../controller/user";
import { adminAuth, authorization } from "../authentication";

const userRouter = express.Router();

userRouter.get("/signin", signin);

userRouter.put("/update", authorization, update);

userRouter.put("/sendotp", authorization, otpSend);

userRouter.put("/resetpassword", authorization, resetPassword);

userRouter.delete("/delete/:id", adminAuth, Delete);

export default userRouter;
