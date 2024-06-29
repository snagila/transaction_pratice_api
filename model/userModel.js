import userSchema from "../schema/userSchema.js";

export const createUser = (userObj) => {
  return userSchema(userObj).save();
};
