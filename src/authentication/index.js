import jwt from "jsonwebtoken";
import { models } from "../models";
import { config } from "../config";

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const data = jwt.verify(token, config.secretKey);

    const userData = await models.User.findOne({ email: data?.email });
    req.loginUser = userData;

    if (data) next();
    else throw new Error("You are'nt authorised...");
  } catch (err) {
    new Error("Please sign to add cart");
  }
};

export const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, config.secretKey);
    if (data.userType !== "admin") throw new Error("You are not admin");
    if (data) next();
    else throw new Error("You are'nt authorised...");
  } catch (error) {
    new Error("Please sign to add cart");
  }
};
