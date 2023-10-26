import { models } from "../models";

export const create = async (req, res) => {
  try {
    const data = await models.User.findOne({ email: req?.body?.email });
    if (data) res.send(`user already exists with email: ${data.email}`);
    else {
      const resData = await models.User.create(req?.body);
      res.send({ status: 200, result: resData });
    }
  } catch (err) {
    res.send({ status: 400, err: err.message });
  }
};
