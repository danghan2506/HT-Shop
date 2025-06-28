import mongoose from "mongoose";
import asyncHandler from "../middlewares/async-handler.js";
import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/create-token.js";
const createUser = asyncHandler(async (req, res) => {
  // contain data that client send to server via body of HTTP request 
  const { username, email, password } = req.body;
  
  // Check inputs
  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }
  const isUserExits = await User.findOne({ email });
  if (isUserExits) {
    res.status(400).send("User already exists!");
  }
  // using brcrypt to hash password 
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    generateToken(res, newUser._id)
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
const login = asyncHandler(async(req, res) => {
  const {email, password} = req.body
  const existingUser = await User.findOne({email})
  if(existingUser){
    const isValidPassword = await bcrypt.compare(password, existingUser.password)
    if(isValidPassword){
      try {
        generateToken(res, existingUser._id)
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role
      })
      } catch (error) {
        throw new Error("User is not exist!")
      }
      return
    }
  }
})
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});
const getAllUsers = asyncHandler(async(req, res) => {
  const users = await User.find({})
  res.json(users)
})
const getProfileCurrentUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
    })
  }else{
    res.status(401)
    throw new Error("No user found!")
  }
})
const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)
  if(user){
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.password = hashedPassword
    }
     const updatedUser = await user.save()
  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role
  })
  }
  else{
    res.status(404)
    throw new Error("An error occured when updating user's profile.")

  }
 
})
export { createUser, login, logoutCurrentUser, getAllUsers, getProfileCurrentUser, updateUserProfile};
