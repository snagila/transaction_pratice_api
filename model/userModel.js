import userSchema from "../schema/userSchema.js";

export const createUser = (userObj) => {
  return userSchema(userObj).save();
};

// find user
export const findUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
