import { models } from "../models";
import { sendOTP } from "./sendOTP";

export const sendReminder = () => {
  const users = models.User.find({});
  users?.map?.((e) => e?.number);

  sendOTP();
};
