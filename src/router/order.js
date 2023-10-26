import express from "express";
import { Delete, cancel, create, get, place, sendOtp, update } from "../controller/order";
import { authorization } from "../authentication";
const orderRouter = express.Router();

orderRouter.post("/create", authorization, create);
orderRouter.post("/place", authorization, place);
orderRouter.post("/sendOtp", authorization, sendOtp);
orderRouter.put("/cancel", authorization, cancel);
orderRouter.get("/getallorders", get);
orderRouter.put("/update/:id", update);
orderRouter.post("/delete/:id", Delete);

export default orderRouter;
