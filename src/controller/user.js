import { models } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailService, sendOTP } from "../functions/sendOTP";

export const signin = async (req, res) => {
  const { email, password } = req?.body;
  const matchUser = await models.User.findOne({ email });
  if (matchUser) {
    const matchpass = await bcrypt.compare(password, matchUser?.password);
    if (matchpass) {
      const token = jwt.sign(
        { email: matchUser.email, userType: matchUser.userType },
        "1234"
      );
      res.send({ status: 200, result: { matchUser, token } });
    } else res.send("User and password does'nt match");
  } else res.send("User and password does'nt match");
};

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

export const update = (req, res) => {
  models.User.findOneAndUpdate({ email: req?.loginUser?.email }, req?.body, {
    new: true,
    upset: true,
  })
    .then((resData) => {
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const Delete = (req, res) => {
  models.User.findByIdAndRemove(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, message: "deleted successfully" });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const otpSend = (req, res) => {
  const { email } = req?.body;
  models.User.findOne({ email })
    .then(async (resData) => {
      if (!resData) res.send({ status: 400, message: "User not found" });
      // emailService(resData.code);
      const otp = await sendOTP(resData);
      resData.code = otp;
      await resData.save();
      res.send({ status: 200, result: resData });
    })
    .catch((err) => {
      res.send({ status: 400, err: err.message });
    });
};

export const resetPassword = async (req, res) => {
  try {
    const { code, password } = req?.body;
    const matchUser = await models.User.findOne({ code });

    if (!matchUser) res.send("User Not Found  ");
    else {
      matchUser.password = password;
      await matchUser.save();
      res.send({ status: 200, message: "password changed" });
    }
  } catch (error) {
    res.send({ status: 400, err: err.message });
  }
};
