// D:\DEVELOPMENT\node.Js\E-Commerce-Crud\src\database\index.js
import mongoose from "mongoose";
import { admin, product } from "./default";
import { oldUserUpdate, oldUserUpdate2 } from "./script";
import { config } from "../config";
export const dbConnection = () => {
  console.log("database connection started...");
  mongoose
    .connect(config.dbUrl)
    .then((res) => {
      console.log("Your database has been connected now!");
    })
    .catch((err) => {
      console.log("Your database has thrown err =>", err);
    });
  admin();
  product();
  oldUserUpdate();
  // oldUserUpdate2();
};
