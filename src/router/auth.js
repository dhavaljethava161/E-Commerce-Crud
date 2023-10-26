import express from "express";
import { create } from "../controller/auth";

const authRouter = express.Router();

authRouter.post("/create", create);

export default authRouter;
