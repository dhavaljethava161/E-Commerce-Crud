import { models } from "../models";

export const oldUserUpdate = async () => {
  try {
    const resData = await models.User.find({});
    for (let i = 0; i < resData.length; i++) {
      const data = await models?.User?.findById(resData?.[i]?.id);
      data.address = data?.address; // so this i am converting multiple addresses to store in address
      await data.save();
    }
  } catch (err) {
    console.log("err: ", err.message);
  }
};

export const oldUserUpdate2 = async () => {
  try {
    let resData = await models.User.find({});
  } catch (err) {}
};
