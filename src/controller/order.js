import { emailService, sendOTP, updateMessage } from "../functions/sendOTP";
import { models } from "../models";
import mongoose from "mongoose";

export const create = (req, res) => {
  models.Order.create(req?.body)
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const place = async (req, res) => {
  const loginUser = req?.loginUser;
  try {
    // const order = await models.Order.create(req?.body);
    // for (const items of order.items) {
    //   const product = await models.Product.findById(items.productId);
    //   const newStock = product.availableStock - items.quantity;
    //   const updatedProduct = await models.Product.findByIdAndUpdate(
    //     items.productId,
    //     { $set: { availableStock: newStock } },
    //     { new: true }
    //   );

    const order = await models.Order.create(req?.body);

    const productIds = order.items.map((item) => item.productId);
    const products = await models.Product.find({ _id: { $in: productIds } });

    for (const items of order.items) {
      const itemProductId = mongoose.Types.ObjectId(items.productId); // Convert to ObjectId
      const product = products.find((p) => p._id.equals(itemProductId)); // Compare using .equals()

      if (!product) {
        console.error(`Product with ID ${items.productId} not found`);
        throw new Error(`Product with ID ${items.productId} not found`);
      }
      const newStock = product.availableStock - items.quantity;
      if (newStock > 0) {
        product.totalSoldUnit += items.quantity;
      } else {
        throw new Error(
          `We have available stock ${product.availableStock} for product with ID ${items.productId}`
        );
      }

      await models.Product.findByIdAndUpdate(items.productId, {
        $set: {
          availableStock: newStock,
          totalSoldUnit: product.totalSoldUnit,
        },
      });
    }
    order.status = "order place";

    emailService({
      from: "test@gmail.com",
      email: loginUser.email,
      subject: "order status updated",
      text: order.status,
    });
    res.send({ status: 200, result: order });
  } catch (error) {
    res.send({ status: 400, err: error.message });
  }
};

export const get = (req, res) => {
  models.Order.find({})
    .populate({ path: "userId", select: { email: 1 } })
    .then((result) => {
      res.send({ status: 200, data: result });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const sendOtp = (req, res) => {
  const { email } = req?.body;
  models.User.findOne({ email })
    .then(async (resData) => {
      if (!resData) res.send("User not found");

      const otp = await sendOTP(resData);
      resData.code = otp;
      resData.save();
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 200, err: err.message });
    });
};

export const cancel = (req, res) => {
  const code = req?.body?.code;
  const _id = req?.body?.orderId;
  // const status = req?.body?.
  const loginUser = req?.loginUser;
  models.Order.findByIdAndUpdate({ _id })
    .then((resData) => {
      if (loginUser.code === code) {
        resData.status = "cancel";
        resData.save();
        updateMessage(loginUser);
        res.send({
          status: 200,
          message: "Your order has been cancel",
          resData,
        });
      } else throw new Error("Otp does not matched!!");
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const getAll = (req, res) => {};

export const update = (req, res) => {
  models.Order.findByIdAndUpdate(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const Delete = (req, res) => {
  models.Order.findByIdAndRemove(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, message: "deleted successfully" });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};
