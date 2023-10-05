import express from "express";
import { Delete, create, get, update } from "../controller/wishlist";

const wishlistRouter = express.Router();

wishlistRouter.post("/create", create);
wishlistRouter.get("/getwishlist/:id", get);
wishlistRouter.put("/update/:id", update);
wishlistRouter.post("/delete:id", Delete);

export default wishlistRouter;
