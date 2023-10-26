import "dotenv/config";
import express from "express";
import { routers } from "./router";
import { dbConnection } from "./database";
import cors from "cors";
import { config } from "./config";

const app = express();
const port = config.port || 2000;
app.use(express.json());
app.use(cors());
app.use("/user", routers.userRouter);
app.use("/cart", routers.cartRouter);
app.use("/product", routers.productRouter);
app.use("/wishlist", routers.wishlistRouter);
app.use("/order", routers.orderRouter);

app.listen(port, () => {
  dbConnection();
  console.log(`Your server is running is at http://localhost:${port}`);
});
