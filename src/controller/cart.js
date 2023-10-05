import { models } from "../models";

export const create = (req, res) => {
  models.Cart.update(
    { userId: req?.loginUser?.id },
    { ...req?.body, userId: req?.loginUser?.id },
    { upsert: true, new: true }
  )
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const get = (req, res) => {
  models.Cart.find({})
    .populate([{ path: "userId", select: { name: 1 } }])
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const update = (req, res) => {
  models.Cart.findByIdAndUpdate(req?.params?.id, req?.body, { new: true })
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const Delete = (req, res) => {
  models.Cart.findByIdAndRemove(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, message: "deleted successfully" });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};
