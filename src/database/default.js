import { models } from "../models";
import productData from "../data/product.json";

export async function admin() {
  try {
    const matchUser = await models.User.findOne({ email: process.env.EMAIL });
    if (!matchUser) {
      models.User.create({
        name: process.env.NAME,
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        userType: "admin",
      });
    }
  } catch (error) {
    console.log("error while creating default admin:===> ", error);
  }
}

export async function product() {
  try {
    const countProduct = await models.Product.countDocuments();
    if (countProduct === 0) {
      models.Product.create(productData);
      console.log("product created!");
    }
  } catch (error) {
    console.log("error while creating default products===>: ", error);
  }
}
