import { models } from "../models";
import productData from "../data/product.json";
import { config } from "../config";

export async function admin() {
  try {
    const matchUser = await models.User.findOne({
      email: config.adminCredentials.email,
    });
    if (!matchUser) {
      models.User.create({
        name: config.adminCredentials.name,
        email: config.adminCredentials.email,
        password: config.adminCredentials.pass,
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
