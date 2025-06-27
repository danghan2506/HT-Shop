import mongoose from "mongoose";
import asyncHandler from "../middlewares/async-handler.js";
import User from "../models/user-model.js";
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check inputs
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }
  const isUserExits = await User.findOne({ email });
  if (isUserExits) {
    res.status(400).send("User already exists!");
  }
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
export { createUser };
