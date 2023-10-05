import { authorization } from "../authentication";
import { Delete, create, get, update } from "../controller/cart";
import express from "express";

// async function findMatchUser(filter) {
//   return await findOne(filter);
// }

const cartRouter = express.Router();

cartRouter.post("/create", authorization, create);

cartRouter.get("/getall", get);

cartRouter.put("update/:id", update);

cartRouter.delete("delete/:id", Delete);

export default cartRouter;
