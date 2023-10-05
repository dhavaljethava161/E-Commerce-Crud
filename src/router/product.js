import express from "express";
import { Delete, create, filter, update } from "../controller/product";
import { adminAuth } from "../authentication";
const productRouter = express.Router();

productRouter.post("/create", adminAuth, create);
productRouter.get("/filter", filter);
productRouter.post("/update/:id", adminAuth, update);
productRouter.post("/delete/:id", adminAuth, Delete);

export default productRouter;
