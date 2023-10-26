import { models } from "../models";

export const oldUserUpdate = async () => {
  try {
    const resData = await models.User.find({});
    for (let i = 0; i < resData.length; i++) {
      const data = await models?.User?.findByIdAndUpdate(resData?.[i]?.id,resData[i]);
      // console.log('data.address :>> ', data.address);
      // data.address = data?.address;  // so this i am converting multiple addresses to store in address
      // await data.save();
    }
  } catch (err) {
    console.log("err: ", err.message);
  }
};

export const oldUserUpdate2 = async () => {
  try {
    let resData = await models?.User?.find({});
    for (let i = 0; i < resData.length; i++) {
      let data = await models?.User?.findByIdAndUpdate(
        resData?.[i]?.id,
        {
          address2: resData?.[i]?.address?.[0], // it add new in address2
          $unset: { address: 1 }, // it will remove old address
        },
        { new: true }
      );
    }
    await models?.User?.updateMany({}, { $rename: { address2: "address" } });
  } catch (err) {
    console.log("err.message :>> ", err.message);
  }
};
