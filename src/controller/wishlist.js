import { models } from "../models";

export const create = (req, res) => {
  models.Wishlist.create(req?.body)
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const get = (req, res) => {
  models.Wishlist.findById(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const update = (req, res) => {
  models.Wishlist.findByIdAndUpdate(req?.params?.id, req?.body, { new: true })
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const Delete = (req, res) => {
  models.Wishlist.findByIdAndRemove(req?.params?.id)
    .then((result) => {
      res.send({ status: 200, message: "deleted successfully" });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};
