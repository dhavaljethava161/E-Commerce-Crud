import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const validEmail = (email) => {
  return validator.isEmail(email);
};
const validPass = (password) => {
  return validator.isStrongPassword(password);
};
const userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      validate: [validEmail, "email is not valid"],
    },
    password: {
      type: String,
      validate: [validPass, "pass is not valid"],
    },
    age: Number,
    number: String,
    address: [
      {
        add: String,
        city: String,
        state: String,
        pincode: Number,
      },
    ],
    userType: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    code: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
export default mongoose.model("User", userSchema);
