import User from "../models/user.model.js";
import { createSecretToken } from "../utils/secrete.js";
import bcrypt from 'bcryptjs'
const Signup = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("existingUser",existingUser);
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    console.log("created user",user);
    const token = createSecretToken({ userId: user._id, email: user.email });
    console.log("token",token);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
const Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken({ userId: user._id, email: user.email });
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "User logged in successfully", success: true ,token});
       next()
    } catch (error) {
      console.error(error);
    }
  }
export { Signup ,Login};
