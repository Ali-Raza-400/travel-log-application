import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const userVerification = (req, res) => {
  console.log("req.cookies", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  console.log("process.env", process.env);
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      console.log("data", data);
      const user = await User.findById(data.userId);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
export { userVerification };
