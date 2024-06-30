import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../helpers/responseHelper.js";
import { createUser, findUserByEmail } from "../model/userModel.js";

export const userRouter = express.Router();

// Create user | signup | Post
userRouter.post("/signup", async (req, res) => {
  try {
    // signup process
    const { name, email, password } = req.body;
    // encrypting / hashing the password
    const encryptedPassword = hashPassword(password);

    // create user in db
    const result = await createUser({
      name: name,
      email: email,
      password: encryptedPassword,
    });
    result?._id
      ? buildSuccessResponse(res, result, "User Created SuccessFully")
      : buildErrorResponse(res, "Could not register the user");
  } catch (error) {
    if (error.code === 11000) {
      error.message = "User with this email already exists.";
    }
    buildErrorResponse(res, error.message);
  }
});

// user login |post
userRouter.post("/login", async (req, res) => {
  try {
    // get email and pw from request
    const { email, password } = req.body;

    // find if the user exists |FIND
    const user = await findUserByEmail(email);

    // user not found
    if (!user?.id) {
      return buildErrorResponse(res, "Invalid Credentials!!");
    }

    // user found
    const isPasswordMatched = comparePassword(password, user.password);
    isPasswordMatched
      ? buildSuccessResponse(res, user, "Logged in Successfully")
      : buildErrorResponse(res, "Invalid Credentials");
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials");
  }
});
