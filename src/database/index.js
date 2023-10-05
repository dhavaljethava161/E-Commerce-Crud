import mongoose from "mongoose";
import { admin, product } from "./default";
import { oldUserUpdate } from "./script";
export const dbConnection = () => {
  console.log("database connection started...");
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((res) => {
      console.log("Your database has been connected now!");
    })
    .catch((err) => {
      console.log("Your database has thrown err =>", err);
    });
  admin();
  product();
  oldUserUpdate();
};
