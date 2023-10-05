import { models } from "../models";

export const create = (req, res) => {
  models.Product.create(req?.body)
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

// export const greater = (req, res) => {
//   const greater = req?.body?.greater;
//   models.Product.find({
//     price: { $gt: greater },
//   }) /* dynamic for ==>{ price: { $gt: 1000 } }*/
//     .then((resData) => {
//       res.send({ status: 200, result: resData });
//     })
//     .catch((err) => {
//       res.send({ status: 400, err: err.message });
//     });
// };

// export const lesser = (req, res) => {
//   const less = req?.body?.less;
//   models.Product.find({ price: { $lt: less } })
//     .then((resData) => {
//       res.send({ status: 200, result: resData });
//     })
//     .catch((err) => {
//       res.send({ status: 200, err: err.message });
//     });
// };

// export const between = (req, res) => {
//   const { greater, lesser } = req?.body;
//   models.Product.find({
//     $and: [{ price: { $gt: greater } }, { price: { $lt: lesser } }],
//   })
//     .then((resData) => {
//       res.send({ status: 200, result: resData });
//     })
//     .catch((err) => {
//       res.send({ status: 400, err: err.message });
//     });
// };

export const filter = async (req, res) => {
  const { gender, gt, lt, category } = req?.body;
  const filter = {};
  if (gender.length > 0) {
    const arr = gender.map((e) => {
      return { gender: e };
    });
    filter = { $or: arr };
  }
  if (category.length > 0) {
    const arr = category.map((e) => {
      return { category: { $in: [e] } };
    });
    filter = { ...filter, $and: arr };
  }
  if (lt && gt) {
    const arr = [{ price: { $gt: gt } }, { price: { $lt: lt } }];
    filter = { ...filter, $and: arr };
  } else if (gt) {
    filter = { ...filter, price: { $gt: gt } };
  } else if (lt) {
    filter = { ...filter, price: { $lt: lt } };
  }
  try {
    const data = await models.Product.find(filter, {
      gender: 1,
      category: 1,
      price: 1,
    });
    res.send({ status: 200, result: data });
  } catch (error) {
    res.send({ status: 400, err: error.message });
  }
};

export const update = (req, res) => {
  models.Product.findByIdAndUpdate(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const Delete = (req, res) => {
  models.Product.findByIdAndRemove(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, message: "deleted successfully" });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};
