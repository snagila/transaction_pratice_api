import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";

export const userRouter = express.Router();

// Create user | signup | Post
userRouter.post("/signup", async (req, res) => {
  try {
    // signup process
    const { name, email, password } = req.body;
    // encrypting / hashing the password
    const encryptedPassword = hashPassword(password);

    // create user in db
  } catch (error) {}
});
