import express from "express";
import cors from "cors";
import { connectMongo } from "./config/dbConfig.js";
import { userRouter } from "./router/userRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// connect to database
connectMongo();

//Router | API endpoint
app.use("/api/user", userRouter);

// start the server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is Running");
});
